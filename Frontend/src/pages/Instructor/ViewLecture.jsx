import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import axios from 'axios'
import { useSelector } from 'react-redux'
import backdrop from '../../assets/landing.png'

const ViewLecture = () => {
  const { courseId, lectureId } = useParams();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const { userData } = useSelector(state => state.user);
  const [course, setCourse] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        // fetch course details (metadata) and populated lectures
        const [courseRes, lecturesRes] = await Promise.all([
          axios.get(`${API_BASE}/api/course/getcourse/${courseId}`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/course/getlecture/${courseId}`, { withCredentials: true })
        ]);
        const c = courseRes.data?.course || courseRes.data;
        const lecs = lecturesRes.data?.lectures || lecturesRes.data || [];
        setCourse(c);
        setLectures(lecs);
        const found = lecs.find(l => String(l._id) === String(lectureId));
        setLecture(found || null);
        setComments(found?.comments || []);
      } catch (e) {
        console.error('Failed to load course/lecture', e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [courseId, lectureId]);

  const isEnrolled = Boolean(userData?.enrolledCourses?.some(id => String(id) === String(courseId)));

  const handleEnroll = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/course/create-checkout-session`, { courseId }, { withCredentials: true });
      const url = res.data?.url || res.data?.session?.url;
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>

  if (!course || !lecture) return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white/90 p-6 rounded-md'>Lecture not found</div>
    </div>
  )

  return (
    <div className='min-h-screen relative' style={{ backgroundImage: `url(${backdrop})`, backgroundSize: 'cover' }}>
      <div className='absolute inset-0 bg-black/40' />
      <div className='relative z-10 max-w-4xl mx-auto p-6'>
        <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
          <div className='flex items-center gap-3 mb-4'>
            <button onClick={() => navigate(-1)} className='text-white p-2 rounded hover:bg-white/10'>
              <FaArrowLeftLong className='w-5 h-5' />
            </button>
            <h2 className='text-xl font-semibold text-white'>{lecture.lectureTitle}</h2>
          </div>
          {isEnrolled ? (
            <div>
              <div className='aspect-video bg-black rounded-md overflow-hidden'>
                <video src={lecture.videoUrl} controls className='w-full h-full object-cover' autoPlay muted playsInline onEnded={() => setCompleted(true)} />
              </div>
              <div className='mt-4 text-white'>
                <p className='mb-3'>{lecture.lectureDescription}</p>
                <div className='flex items-center gap-3'>
                  <button disabled={!completed || !lectures || lectures.length === 0} onClick={() => {
                    const idx = lectures.findIndex(l => String(l._id) === String(lectureId));
                    const next = lectures[idx + 1];
                    if (next) {
                      setCompleted(false);
                      navigate(`/viewlecture/${courseId}/${next._id}`);
                    }
                  }} className={`px-4 py-2 rounded-md text-white ${completed ? 'bg-indigo-600' : 'bg-gray-500/50 cursor-not-allowed'}`}>
                    {(() => {
                      const idx = lectures.findIndex(l => String(l._id) === String(lectureId));
                      return (lectures[idx + 1]) ? 'Next Lecture' : 'No More Lectures';
                    })()}
                  </button>
                  {!completed && <span className='text-sm text-gray-300'>Watch until the end to unlock next</span>}
                </div>

                {/* Comments / reviews (client-side dynamic until backend endpoints exist) */}
                <div className='mt-6'>
                  <h3 className='text-lg font-semibold'>Comments</h3>
                  <div className='mt-3 space-y-3'>
                    {comments.length === 0 && <p className='text-sm text-gray-300'>No comments yet.</p>}
                    {comments.map((cmt, i) => (
                      <div key={i} className='bg-white/5 p-3 rounded-md'>
                        <div className='text-sm text-white'>{cmt.text}</div>
                        <div className='text-xs text-gray-400'>{cmt.author || 'Anonymous'}</div>
                      </div>
                    ))}
                  </div>
                  {isEnrolled && (
                    <div className='mt-4'>
                      <textarea value={newComment} onChange={e => setNewComment(e.target.value)} rows={3} className='w-full p-2 rounded-md bg-white/5 text-white' placeholder='Add a comment...'></textarea>
                      <div className='flex gap-2 mt-2'>
                        <button onClick={() => {
                          if (!newComment.trim()) return;
                          const newC = { text: newComment.trim(), author: userData?.name || 'You' };
                          setComments(prev => [newC, ...prev]);
                          setNewComment('');
                        }} className='px-4 py-2 bg-indigo-600 rounded-md text-white'>Post</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='p-6 text-center'>
              <p className='text-white mb-4'>You need to enroll to watch this lecture.</p>
              <div className='flex justify-center gap-3'>
                <button onClick={handleEnroll} className='px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>Enroll</button>
                <button onClick={() => navigate(-1)} className='px-4 py-2 rounded-md border border-white/20 text-white/90'>Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewLecture
