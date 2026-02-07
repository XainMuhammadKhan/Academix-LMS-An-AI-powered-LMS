import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
import Card from '../../components/Card'
import { setSelectedCourse } from '../../redux/courseSlice';
import { setReviews, addReview } from '../../redux/reviewSlice';
import img from '../../assets/empty.jpg'
import backdrop from '../../assets/landing.png'
import { FaStar } from 'react-icons/fa6'

function ViewCourse() {
  const { courseData } = useSelector(state => state.course)
  const { selectedCourse } = useSelector(state => state.course);
  const { userData } = useSelector(state => state.user);
  const { reviews: reduxReviews } = useSelector(state => state.review);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState(null);
  const [ratingInput, setRatingInput] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const reviews = reduxReviews[courseId] || [];

  const fetchCourseData = async () => {
    if (!courseData || courseData.length === 0) return;
    const found = courseData.find(course => String(course._id) === String(courseId));
    if (found) dispatch(setSelectedCourse(found));
  }
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(`${API_BASE}/api/course/creator`, { userId: selectedCourse?.creator }, { withCredentials: true });
          setCreatorData(result.data?.user || result.data);
        } catch (error) {
          console.error('Error fetching creator data:', error);
        }
      }
    }
    handleCreator();
  }, [selectedCourse])

  useEffect(() => {
    fetchCourseData();
  }, [courseData, courseId])

  // when course is loaded, clear any selected lecture (we only list titles here)
  useEffect(() => {
    setSelectedLecture(null);
  }, [selectedCourse]);

  const [enrolling, setEnrolling] = useState(false);
  const handleEnroll = async () => {
    if (!selectedCourse?._id) return;
    // if already enrolled, jump to course
    if (isEnrolled) {
      // open first lecture page
      if (selectedCourse?.lectures?.length > 0) {
        navigate(`/viewlecture/${courseId}/${selectedCourse.lectures[0]._id}`);
      }
      return;
    }
    try {
      setEnrolling(true);
      const result = await axios.post(`${API_BASE}/api/course/create-checkout-session`, { courseId: selectedCourse._id }, { withCredentials: true });
      const url = result.data?.url || result.data?.session?.url;
      if (url) window.location.href = url;
      else {
        console.error('No checkout URL returned', result.data);
        setEnrolling(false);
      }
    } catch (error) {
      console.error('Checkout error', error);
      setEnrolling(false);
    }
  }

  useEffect(() => {
    if (creatorData?._id && courseData?.length > 0) {
      const filteredCourses = courseData.filter(course => String(course.creator) === String(creatorData?._id) && String(course._id) !== String(courseId));
      setCreatorCourses(filteredCourses);
    }
  },[creatorData, courseData])


  // determine if current user is enrolled in this course
  useEffect(() => {
    if (!userData || !selectedCourse) return setIsEnrolled(false);
    const enrolledByUser = (userData.enrolledCourses || []).some(id => String(id) === String(selectedCourse._id));
    const enrolledInCourse = (selectedCourse.enrolledStudents || []).some(id => String(id) === String(userData._id));
    setIsEnrolled(Boolean(enrolledByUser || enrolledInCourse));
  }, [userData, selectedCourse]);

  // fetch fresh reviews from backend (populated) so they persist across reloads
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/course/getcourse/${courseId}`, { withCredentials: true });
        const c = res.data?.course || res.data;
        if (c?.reviews) dispatch(setReviews({ courseId, reviews: c.reviews }));
      } catch (err) {
        console.error('Failed to load course reviews', err);
      }
    }
    if (courseId) loadReviews();
  }, [courseId]);
  // No preview logic on frontend — we only list lectures here. Watching is done on the ViewLecture page.


  return (
    <div className='min-h-screen relative' style={{ backgroundImage: `url(${backdrop})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='absolute inset-0 bg-black/40' />
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 space-y-6 border border-white/20">
        {/* top section */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong className='text-white w-[22px] h-[22px] cursor-pointer' onClick={() => navigate(-1)} />
            <img
              src={selectedCourse?.thumbnailUrl || selectedCourse?.thumbnail?.url || selectedCourse?.thumbnail || img}
              alt={selectedCourse?.title || 'No thumbnail available'}
              className='rounded-xl w-full object-cover'
            />
          </div>
          {/* course details */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-xl font-bold text-gray-100">{selectedCourse?.title || 'Course Title'}</h2>
            <p className="text-gray-200">{selectedCourse?.subTitle || 'Course Description'}</p>
            <div className="flex items-start flex-col justify-between">
                <div className='text-yellow-400 font-medium flex items-center gap-3'>
                  <div className='flex items-center gap-1'>
                    <FaStar />
                    <span className='font-semibold'>{reviews.length ? (reviews.reduce((s,r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : '—'}</span>
                  </div>
                  <div className='text-gray-400 text-sm'>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</div>
                </div>
                <div>
                  {(() => {
                    const rawPrice = Number(selectedCourse?.price || 0);
                    // If price looks like an original high price (e.g., 5000), swap to show sale 599 as main.
                    const shouldSwap = rawPrice > 1000;
                    const mainPrice = shouldSwap ? 599 : (rawPrice || 'Free');
                    const crossPrice = shouldSwap ? rawPrice : 599;
                    return (
                      <>
                        <span className="text-gray-100">${mainPrice}</span>{' '}
                        <span className='line-through text-sm text-gray-300'>${crossPrice}</span>
                      </>
                    )
                  })()}
                </div>
              <ul className="text-sm text-gray-200 space-y-1 pt-2">
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>
                <button onClick={handleEnroll} disabled={enrolling} className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 mt-3 disabled:opacity-60 disabled:cursor-not-allowed">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
                  <span className="relative z-10">{isEnrolled ? 'Go to Course' : (enrolling ? 'Redirecting...' : 'Enroll now')}</span>
                </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>What You'll Learn</h2>
          <ul className="list-disc pl-6 text-black space-y-1">
            <li>{selectedCourse?.category} from beginning</li>  </ul></div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-black">Beginners, Aspiring developers and Professionals to Upskill</p>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='bg-white/10 backdrop-blur-sm w-full p-6 rounded-2xl shadow-lg border border-white/10'>
            <h2 className='text-xl font-bold mb-1 text-gray-100'>Course Curriculum</h2>
            <p className="text-sm text-gray-300 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>
            <div className={`flex flex-col gap-5 relative`}>
                {selectedCourse?.lectures?.map((lecture, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left border-white/10`}
                  >
                    <span className='flex-1 text-sm font-medium text-gray-100'>{lecture?.lectureTitle}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className='mt-3'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='flex items-center gap-1 text-yellow-400'>
                <FaStar />
                <span className='font-semibold'>{reviews.length ? (reviews.reduce((s,r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : '—'}</span>
              </div>
              <div className='text-sm text-black'>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</div>
            </div>

            {/* List reviews */}
            <div className='space-y-3 mb-4'>
              {reviews.length === 0 && <div className='text-sm text-gray-300'>No reviews yet.</div>}
              {reviews.map((r, i) => (
                <div key={i} className='bg-white/10 p-3 rounded-md border border-white/10'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='text-yellow-400 flex items-center'>
                        {Array.from({ length: 5 }).map((_, si) => (
                          <FaStar key={si} className={si < (r.rating || 0) ? 'fill-amber-300' : 'text-gray-300'} />
                        ))}
                      </div>
                      <div className='text-sm font-medium text-gray-100'>{r.user?.name || r.author || 'Anonymous'}</div>
                    </div>
                  </div>
                  {r.text && <p className='text-sm text-gray-200 mt-2'>{r.text}</p>}
                </div>
              ))}
            </div>

            {/* Add review form (students only) */}
            {userData && (
              <div className='bg-white/10 p-4 rounded-md border border-white/10'>
                <div className='mb-2 text-sm'>Your rating</div>
                <div className='flex gap-1 mb-3'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button type='button' key={i} onClick={() => setRatingInput(i + 1)} className='text-yellow-400'>
                      <FaStar className={i < ratingInput ? 'fill-amber-300' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} className='w-full border border-gray-300 rounded-lg p-2 mb-3' placeholder='Write your review here...' />
                <div className='flex items-center gap-3'>
                  <button disabled={submittingReview || ratingInput === 0} onClick={async () => {
                    if (ratingInput === 0) return;
                    setSubmittingReview(true);
                    try {
                        const resp = await axios.post(`${API_BASE}/api/course/review/${courseId}`, { rating: ratingInput, text: reviewText.trim() }, { withCredentials: true });
                        const updatedReviews = resp.data?.reviews || [];
                        dispatch(setReviews({ courseId, reviews: updatedReviews }));
                        // update redux selectedCourse with new reviews array
                        dispatch(setSelectedCourse({ ...selectedCourse, reviews: resp.data?.reviews || [] }));
                      } catch (err) {
                        console.error('Failed to persist review', err);
                      }
                    setRatingInput(0);
                    setReviewText('');
                    setSubmittingReview(false);
                  }} className="group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow border border-gray-700 disabled:opacity-60 disabled:cursor-not-allowed">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
                    <span className="relative z-10">{submittingReview ? 'Posting...' : 'Submit Review'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* for creator info */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <img src={creatorData?.photoUrl || creatorData?.avatar?.url || img} alt={creatorData?.name || 'Creator'} className='border-1 border-gray-200 w-16 h-16 rounded-full object-cover'/>
          <div>
            <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
            <p className='md:text-sm text-black text-[10px]'>{creatorData?.description}</p>
            <p className='md:text-sm text-black text-[10px]'>{creatorData?.email}</p>
          </div>
        </div>
        <div>
          <p className='text-xl font-semibold mb-2'>
              Other Courses by {creatorData?.name}
          </p>
          </div>
          <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
            {creatorCourses?.map((course, index) => (
              <Card thumbnail={course.thumbnailUrl || course.thumbnail} id={course._id || course.id} price={course.price} title={course.title} category={course.category} reviews={course.reviews || []} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCourse
