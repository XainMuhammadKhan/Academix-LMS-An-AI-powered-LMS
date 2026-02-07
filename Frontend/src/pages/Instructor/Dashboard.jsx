import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import homenew from '../../assets/homenew.png'
import { FaArrowLeft } from 'react-icons/fa6'
import {ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart} from "recharts"

function Dashboard() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const {creatorCourseData} = useSelector(state => state.course)

    const CourseProgressData = creatorCourseData?.map((course)=>({
      name:course.title?.slice(0,10)+"...",
      lectures:course.lectures?.length || 0,
    })) ||[]
    const EnrollData = creatorCourseData?.map((course)=>({
      name:course.title?.slice(0,10)+"...",
      Enrolled: course.enrolledStudents?.length || 0,
    })) ||[]

    const totalEarning = creatorCourseData?.reduce((sum, course)=>{
      const studentCount = course.enrolledStudents?.length||0;
      const courseRevenue = course.price?course.price*studentCount:0
      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className='min-h-screen relative bg-cover bg-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>

      <div className='relative z-20 flex items-center justify-center py-12 px-4'>
        {/* main glass card */}
        <div className='max-w-5xl w-full relative backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border border-white/20 shadow-lg'>
          <button
            onClick={() => navigate('/home')}
            aria-label='Back to home'
            className='absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-gray-900 border border-black/10 shadow-md cursor-pointer'
          >
            <FaArrowLeft className='w-4 h-4' />
          </button>
          {userData?.photoUrl ? (
            <img src={userData.photoUrl} className='w-28 h-28 rounded-full object-cover border-4 border-white shadow-md' alt="Instructor" />
          ) : (
            <div className='w-28 h-28 rounded-full  flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-md'>
              {(userData?.name || 'I').charAt(0).toUpperCase()}
            </div>
          )}

          <div className='text-center md:text-left space-y-1'>
            <h1 className='text-2xl font-bold text-white'>Welcome, {userData?.name || "Instructor"}</h1>
            <h2 className='text-xl font-semibold text-white/90'>Total Earnings: {totalEarning.toLocaleString()||0}</h2>
            <p className='text-white/90 text-sm max-w-xl'>{userData?.description || "Start Creating Courses for Your Students"} </p>

            <div className='mt-4 flex gap-3 justify-center md:justify-start'>
              <button onClick={() => navigate('/courses')} className='group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700'>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
                <span className='relative z-10'>Create Courses</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Section placeholder */}
      <div className='relative z-20 max-w-5xl mx-auto px-4 mt-8'>
        <div className=' backdrop-blur-sm rounded-lg p-6 border border-white/10'>
          {/* for course progress graph */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CourseProgressData}>
              <CartesianGrid strokeDasharray ="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis dataKey="lectures"/>
              <Tooltip/>
              <Bar dataKey="lectures" fill="black" radius={[5,5,0,0]}/>
            </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Enrolled Data */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Enrolled Students</h2>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={EnrollData}>
              <CartesianGrid strokeDasharray ="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis dataKey="Enrolled"/>
              <Tooltip/>
              <Bar dataKey="Enrolled" fill="black" radius={[5,5,0,0]}/>
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
