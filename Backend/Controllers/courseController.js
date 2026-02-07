import Course from "../Models/courseModel.js";
import Lecture from "../Models/lectureModel.js";
import User from "../Models/userModel.js";
import Review from "../Models/reviewModel.js";
import uploadToCloudinary from "../Config/cloudinary.js";
import Stripe from 'stripe';

let stripe = null;
if (process.env.STRIPE_API_KEY) {
    try {
        console.log('Initializing Stripe with key prefix:', process.env.STRIPE_API_KEY.slice(0,8) + '...');
        stripe = new Stripe(process.env.STRIPE_API_KEY);
    } catch (err) {
        console.error('Failed to initialize Stripe:', err.message);
        stripe = null;
    }
} else {
    console.warn('STRIPE_API_KEY not set; Stripe features will be disabled.');
}

// Helper to initialize Stripe on-demand (useful because ESM imports run before dotenv.config())
function initStripeIfNeeded() {
    if (!stripe && process.env.STRIPE_API_KEY) {
        try {
            console.log('Initializing Stripe on-demand with key prefix:', process.env.STRIPE_API_KEY.slice(0,8) + '...');
            stripe = new Stripe(process.env.STRIPE_API_KEY);
        } catch (err) {
            console.error('On-demand Stripe initialization failed:', err.message);
            stripe = null;
        }
    }
}

export const createCourse = async (req, res) => {
    try {
        const { title, subtitle, description, category, level, price, isPublished } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Title and Category are required" });
        }

        // optional: handle thumbnail upload if sent via multipart
        let thumbnailUrl;
        if (req.file) {
            try {
                thumbnailUrl = await uploadToCloudinary(req.file.path);
            } catch (err) {
                console.error('cloudinary upload failed', err);
            }
        }

        const course = await Course.create({
            title: title.trim(),
            subtitle: subtitle || undefined,
            description: description || undefined,
            category,
            level: level || undefined,
            price: price ? Number(price) : undefined,
            thumbnailUrl: thumbnailUrl || undefined,
            creator: req.userId,
            isPublished: isPublished === true || isPublished === 'true' ? true : false,
        });

        return res.status(201).json({ course });
    } catch (error) {
        console.error("Create Error:", error);
        return res.status(500).json({ message: "Failed to create course", error: error.message });
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isPublished: true
        })
        .populate("lectures")
        .populate({ path: 'reviews', populate: { path: 'user', select: 'name email' } });
        if (!courses) {
            return res.status(404).json({ message: "No published courses found" });
        }
        return res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get published courses", error: error.message });
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({ creator: userId })
            .populate({ path: 'reviews', populate: { path: 'user', select: 'name email' } });
        if (!courses) {
            return res.status(404).json({ message: "No courses found for this creator" });
        }
        return res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get creator courses", error: error.message });
    }
}

export const editCourse = async (req, res) => {
    try {
        console.debug('editCourse invoked - params:', req.params, 'body keys:', Object.keys(req.body || {}), 'file:', !!req.file)
        const { courseId } = req.params;
        const { title, subtitle, description, category, level, price, isPublished } = req.body;
        // sanitize and coerce price (frontend may send strings like "1$" or "$1,000")
        let parsedPrice;
        if (price !== undefined) {
            const cleaned = String(price).replace(/[^0-9.-]+/g, '');
            if (cleaned === '') {
                parsedPrice = undefined;
            } else {
                parsedPrice = Number(cleaned);
                if (Number.isNaN(parsedPrice)) {
                    return res.status(400).json({ message: 'Invalid price value' });
                }
            }
        }
        let thumbnail
        if (req.file) {
            thumbnail = await uploadToCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const updateData = {
            ...(title !== undefined && { title }),
            ...(subtitle !== undefined && { subtitle }),
            ...(description !== undefined && { description }),
            ...(category !== undefined && { category }),
            ...(level !== undefined && { level }),
            ...(parsedPrice !== undefined && { price: parsedPrice }),
            ...(isPublished !== undefined && { isPublished }),
            ...(thumbnail && { thumbnailUrl: thumbnail }),
        };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true, runValidators: true });
        return res.status(200).json({ course });
    } catch (error) {
        console.error('Edit course error', error);
        return res.status(500).json({ message: 'Failed to edit course', error: error.message });
    }
}

export const getCoursebyId = async (req, res) => {
    try {
        const { courseId } = req.params;
        let course = await Course.findById(courseId)
            .populate({ path: 'lectures' })
            .populate({ path: 'reviews', populate: { path: 'user', select: 'name email' } });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ course });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get course by ID", error: error.message });
    }
}

export const createReview = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { rating, text } = req.body;
        if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Upsert: update existing review or create new one (one per user per course)
        let review = await Review.findOneAndUpdate(
            { user: req.userId, course: courseId },
            { rating, text, user: req.userId, course: courseId },
            { upsert: true, new: true }
        );

        // Ensure review is in course.reviews array (if it's new, $addToSet it; if updated, it's already there)
        await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { reviews: review._id } }
        );

        const populated = await Course.findById(courseId).populate({ path: 'reviews', populate: { path: 'user', select: 'name email' } });
        return res.status(201).json({ reviews: populated.reviews });
    } catch (error) {
        console.error('Create review error', error);
        return res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course = await Course.findByIdAndDelete(courseId, { new: true });
        return res.status(200).json({ message: "Course deleted successfully", course });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
}


// for lecture

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle, lectureDescription, isPreviewFree, videoUrl: bodyVideoUrl } = req.body;
        const { courseId } = req.params;
        if (!lectureTitle || !lectureDescription || !courseId) {
            return res.status(400).json({ message: "Lecture title, description and Course ID are required" });
        }

        // handle optional video upload
        let videoUrl;
        if (req.file) {
            try {
                videoUrl = await uploadToCloudinary(req.file.path);
            } catch (err) {
                console.error('video upload failed', err);
            }
        }

        const lecture = await Lecture.create({
            lectureTitle: lectureTitle,
            lectureDescription: lectureDescription,
            videoUrl: videoUrl || bodyVideoUrl || undefined,
            isPreviewFree: isPreviewFree === 'true' || isPreviewFree === true ? true : false,
        });

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.lectures.push(lecture._id);
        await course.populate('lectures');
        await course.save();
        return res.status(201).json({ lecture });
    } catch (error) {
        console.error('Create lecture error', error);
        return res.status(500).json({ message: 'Failed to create lecture', error: error.message });
    }
}


export const getCourseLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        await course.populate('lectures');
        await course.save();
        return res.status(200).json({ lectures: course.lectures });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get course lectures", error: error.message });
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { isPreviewFree, lectureTitle, lectureDescription, videoUrl: bodyVideoUrl } = req.body;
        let lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        let videoUrl
        if (req.file) {
            videoUrl = await uploadToCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if (lectureTitle !== undefined) {
            lecture.lectureTitle = lectureTitle
        }
        if (lectureDescription !== undefined) {
            lecture.lectureDescription = lectureDescription
        }
        // if a video link was provided in body and no file uploaded, update it
        if (!req.file && bodyVideoUrl) {
            lecture.videoUrl = bodyVideoUrl
        }
        if (isPreviewFree !== undefined) {
            lecture.isPreviewFree = isPreviewFree === 'true' || isPreviewFree === true ? true : false;
        }
        await lecture.save()
        return res.status(200).json({ lecture });
    } catch (error) {
        return res.status(500).json({ message: "Failed to edit lecture", error: error.message });
    }
}

export const removeLecture = async (req, res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )
        return res.status(200).json({message:"Lecture removed successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Failed to remove lecture", error: error.message });
    }
}


export const getCreatorById = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get creator", error: error.message });
    }
};

export const createCheckoutSession = async (req, res) => {
    try {
        initStripeIfNeeded();
        if (!stripe) {
            console.error('Stripe not initialized. STRIPE_API_KEY missing or invalid.');
            return res.status(500).json({ message: 'Stripe not configured on server' });
        }
        const { courseId } = req.body;
        if (!courseId) return res.status(400).json({ message: 'Course ID required' });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const priceInCents = Math.round((course.price || 0) * 100);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: course.title, description: course.subtitle || '' },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${'https://academix-lms-an-ai-powered-lms-1.onrender.com'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${'https://academix-lms-an-ai-powered-lms-1.onrender.com'}/payment/failure?session_id={CHECKOUT_SESSION_ID}`,
            metadata: { courseId: String(courseId), userId: String(req.userId) },
        });

        return res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe create session error', error);
        return res.status(500).json({ message: 'Failed to create checkout session', error: error.message });
    }
}

export const verifyCheckoutSession = async (req, res) => {
    try {
        initStripeIfNeeded();
        if (!stripe) {
            console.error('Stripe not initialized. STRIPE_API_KEY missing or invalid.');
            return res.status(500).json({ message: 'Stripe not configured on server' });
        }
        const { sessionId } = req.body;
        console.log('verifyCheckoutSession called with sessionId:', sessionId, 'userId:', req.userId);
        if (!sessionId) return res.status(400).json({ message: 'sessionId required' });

        const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['payment_intent'] });
        if (!session) return res.status(404).json({ message: 'Session not found' });

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ message: 'Payment not completed', session });
        }

        const courseId = session.metadata?.courseId;
        const userId = session.metadata?.userId;

        if (courseId && userId) {
            // Use atomic updates to avoid triggering full-document validation
            // (some user docs may contain legacy enum values like 'Student')
            try {
                await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });
            } catch (err) {
                console.error('Failed to update course enrollment via atomic update', err);
            }
            try {
                await User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: courseId } });
            } catch (err) {
                console.error('Failed to update user enrollment via atomic update', err);
            }
        }

        return res.status(200).json({ message: 'Payment verified', session });
    } catch (error) {
        console.error('verifyCheckoutSession error', error);
        return res.status(500).json({ message: 'Failed to verify session', error: error.message });
    }
}

export const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        // ensure stripe is initialized before verifying webhook
        initStripeIfNeeded();
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            // If webhook secret not provided, try parsing the body (less secure)
            event = req.body;
        } else {
            if (!stripe) {
                console.error('Stripe not initialized but STRIPE_WEBHOOK_SECRET is set. Cannot verify signature.');
                return res.status(500).send('Stripe not configured on server');
            }
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        }
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
        const session = event.data.object;
        const courseId = session.metadata?.courseId;
        const userId = session.metadata?.userId;
        try {
            if (courseId && userId) {
                try {
                    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });
                } catch (err) {
                    console.error('Webhook: Failed to update course enrolledStudents', err);
                }
                try {
                    await User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: courseId } });
                } catch (err) {
                    console.error('Webhook: Failed to update user enrolledCourses', err);
                }
            }
        } catch (err) {
            console.error('Webhook enrollment error', err);
        }
    }

    res.json({ received: true });
}
