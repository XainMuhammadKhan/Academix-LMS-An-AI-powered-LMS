import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import homenew from '../../assets/homenew.png'
import img from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'


function Courses() {
  const navigate = useNavigate()
  const {creatorCourseData} = useSelector(state=>state.course)
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  React.useEffect(() => {
    console.debug('Courses component - creatorCourseData:', creatorCourseData)
  }, [creatorCourseData])
  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>

      <div className='backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-4xl w-full relative z-20 border border-white/20'>
        <button
          onClick={() => navigate('/dashboard')}
          aria-label='Back to home'
          className='absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-gray-900 border border-black/10 shadow-md cursor-pointer'
        >
          <FaArrowLeft className='w-4 h-4' />
        </button>

        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white pl-12'>All Created Courses</h2>
          <button onClick={() => navigate('/instructor/create-course')} className='group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700'>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className='relative z-10'>Create Course</span>
          </button>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-4'>
          {Array.isArray(creatorCourseData) && creatorCourseData.length > 0 ? (
          <div className='hidden md:block'>
          <div className='max-h-[60vh] overflow-auto'>
          <table className='min-w-full text-sm'>
            <thead className='border-b border-white/10'>
              <tr>
                <th className='text-left py-3 px-4 text-white/90'>Courses</th>
                <th className='text-left py-3 px-4 text-white/90'>Price</th>
                <th className='text-left py-3 px-4 text-white/90'>Status</th>
                <th className='text-left py-3 px-4 text-white/90'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr key={course._id || index} className='border-b border-white/10 hover:bg-white/5 transition duration-200'>
                  <td className='py-3 px-4 flex items-center gap-4 text-white'>
                    <img src={course.thumbnailUrl || course.thumbnail || img} className='w-24 h-14 object-cover rounded-md' alt={course.title || 'thumbnail'} />
                    <div>
                      <div className='text-white/90 font-semibold'>{course.title}</div>
                      {course.subtitle && <div className='text-white/70 text-sm mt-1'>{course.subtitle}</div>}
                      <div className='flex gap-2 mt-2'>
                        {course.category && (
                          <span className='relative inline-flex items-center text-xs px-3 py-1 rounded-md font-semibold overflow-hidden'>
                            <span className='absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black opacity-95'></span>
                            <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 transition-transform duration-700 ease-in-out'></span>
                            <span className='relative z-10 text-white'>{course.category}</span>
                          </span>
                        )}
                        {course.level && (
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${course.level === 'Beginner' ? 'bg-green-600 text-white' : course.level === 'Intermediate' ? 'bg-yellow-400 text-black' : 'bg-red-600 text-white'}`}>
                            {course.level}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  {course?.price ? (
                    <td className='px-4 py-3 text-white/90'>{course?.price}</td>
                  ) : (
                    <td className='px-4 py-3 text-white/90'>$ NA</td>
                  )}
                  <td className='px-4 py-3'>
                    <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? 'bg-green-500 text-green-100' : 'bg-red-500/20 text-red-100'}`}>{course.isPublished ? 'Published' : 'Draft'}</span>
                  </td>
                  <td className='px-4 py-3'>
                    <FaEdit onClick={() => navigate(`/instructor/edit/${course._id || index}`)} className='text-white/90 hover:text-white cursor-pointer'/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          ) : (
            <div className='py-8 text-center text-white/80'>
              <p className='mb-2'>No courses found yet.</p>
              <button onClick={() => navigate('/instructor/create-course')} className='underline'>Create your first course</button>
            </div>
          )}
        </div>

        {/* mobile list */}
        <div className='md:hidden mt-4 max-h-[60vh] overflow-auto space-y-3'>
          {Array.isArray(creatorCourseData) && creatorCourseData.length > 0 ? (
            creatorCourseData?.map((course, idx) => (
              <div
                key={course._id || idx}
                className='bg-white/10 rounded-lg p-4 flex flex-col gap-3 border border-white/10 cursor-pointer'
                role='button'
                tabIndex={0}
                onClick={() => navigate(`/instructor/edit/${course._id || idx}`)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/instructor/edit/${course._id || idx}`) }}
              >
                <div className='flex gap-4 items-center'>
                  <img src={course.thumbnailUrl || img} alt="" className='w-16 h-16 rounded-md object-cover'/>
                  <div className='flex-1'>
                    <h2 className='font-medium text-sm text-white'>{course.title}</h2>
                    {course.subtitle && <div className='text-white/70 text-xs mt-1'>{course.subtitle}</div>}
                    <p className='text-white/80 text-xs mt-1'>{course?.price ? `$${course.price}` : '$NA'}</p>
                    <div className='flex gap-2 mt-2'>
                      {course.category && (
                        <span className='relative inline-flex items-center text-xs px-3 py-1 rounded-md font-semibold overflow-hidden'>
                          <span className='absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black opacity-95'></span>
                          <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 transition-transform duration-700 ease-in-out'></span>
                          <span className='relative z-10 text-white'>{course.category}</span>
                        </span>
                      )}
                      {course.level && (
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${course.level === 'Beginner' ? 'bg-green-500 text-white' : course.level === 'Intermediate' ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'}`}>
                          {course.level}
                        </span>
                      )}
                    </div>
                  </div>
                  <FaEdit onClick={(e) => { e.stopPropagation(); navigate(`/instructor/edit/${course._id || idx}`) }} className='text-white/80 hover:text-white cursor-pointer'/>
                </div>
                <span className={`w-fit px-3 py-1 text-xs rounded-full ${course.isPublished ? 'bg-green-500 text-green-100' : 'bg-red-600/20 text-red-100'}`}>{course.isPublished ? 'Published' : 'Draft'}</span>
              </div>
            ))
          ) : (
            <div className='py-6 text-center text-white/80'>No courses found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses
