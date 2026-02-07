import User from "../Models/userModel.js";
import uploadToCloudinary from "../Config/cloudinary.js";

export const getCurrentUser = async(req, res) => {
    try {
        console.log("=== GET CURRENT USER ===");
        console.log("req.userId:", req.userId);
        
        if (!req.userId) {
            return res.status(400).json({ message: "No userId in request" });
        }
        
        const user = await User.findById(req.userId)
            .select("-password")
            .populate({
                path: 'enrolledCourses',
                populate: { path: 'reviews', populate: { path: 'user', select: 'name email' } }
            });
        console.log("User found:", user ? user.email : "Not found");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Get Current User Error:", error);
        return res.status(500).json({ message: "Failed to get current user", error: error.message });
    }}

export const uploadProfile = async(req, res) => {
    try {
        const userId = req.userId;
        const {description, name} = req.body;
                let photoUrl
                if (req.file) {
                        console.log('uploadProfile: received file:', {
                            originalname: req.file.originalname,
                            mimetype: req.file.mimetype,
                            size: req.file.size,
                            path: req.file.path
                        })
                        try {
                            photoUrl = await uploadToCloudinary(req.file.path) // Assuming multer middleware is used
                            console.log('uploadProfile: cloudinary returned url=', photoUrl)
                        } catch (err) {
                            console.error('uploadProfile: cloudinary upload failed', err)
                        }
                }
        // Build update object only with provided fields to avoid wiping fields unintentionally
        const update = {};
        if (typeof name !== 'undefined') update.name = name;
        if (typeof description !== 'undefined') update.description = description;
        if (typeof photoUrl !== 'undefined') update.photoUrl = photoUrl;

        // Return the updated document (new: true)
        const user = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
     } catch (error) {
        console.error("Upload Profile Error:", error);
        return res.status(500).json({ message: "Failed to upload profile", error: error.message });
    }}