import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import placeholder from '../assets/empty.jpg'
import backdrop from '../assets/landing.png'
function MyEnrolledCourses() {
    const { userData } = useSelector(state => state.user);
    const navigate = useNavigate();
  return (
    <div className='min-h-screen relative' style={{ backgroundImage: `url(${backdrop})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='absolute inset-0 bg-black/40' />
      <div className='relative z-10 min-h-screen p-6'>
        <div className='max-w-6xl mx-auto bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 space-y-6 border border-white/20'>
          <div className='flex items-center justify-between'>
            <FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")} />
            <h1 className='text-3xl text-center font-bold text-gray-800'>My Enrolled Courses</h1>
            <div style={{width:22}} />
          </div>

          {
            userData?.enrolledCourses?.length === 0 ? (
              <p className='text-gray-700 text-center w-full'>You have not enrolled in any courses yet.</p>
            ) : (
              <div className='flex items-center justify-center flex-wrap gap-6'>
                {userData?.enrolledCourses?.map((course,index)=> (
                  <div key={index} className='bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10 w-80'>
                    <img className='w-full h-40 object-cover' src={course?.thumbnailUrl || course?.thumbnail?.url || course?.thumbnail || placeholder} alt={course?.title || 'Course thumbnail'} />
                    <div className='p-5'>
                      <h2 className="text-lg font-semibold text-gray-100">{course?.title}</h2>
                      <p className="text-sm text-gray-200/90 mb-2">{course?.category}</p>
                      <p className="text-sm text-gray-200/90 mb-4">{course?.level}</p>
                      <button onClick={() => {
                        const firstLectureId = (course.lectures && course.lectures[0])?._id;
                        if (firstLectureId) navigate(`/viewlecture/${course._id}/${firstLectureId}`);
                        else navigate(`/viewcourse/${course._id}`);
                      }} className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 disabled:opacity-60 disabled:cursor-not-allowed">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
                        <span className='relative z-10'>Watch Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MyEnrolledCourses
