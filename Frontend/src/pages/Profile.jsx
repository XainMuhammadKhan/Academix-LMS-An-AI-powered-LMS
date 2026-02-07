import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import homenew from '../assets/homenew.png'
import { FaArrowLeft } from "react-icons/fa6";


const Profile = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate();
  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className=' backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-xl w-full relative z-20 border border-white/20'>
        <button
          onClick={() => navigate('/')}
          aria-label="Back to home"
          className="absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-gray-900 border border-black/10 shadow-md cursor-pointer"
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>
        <div className='flex flex-col items-center text-center'>
          {userData?.photoUrl ? (
            <img src={userData?.photoUrl} alt="profile" className='w-24 h-24 rounded-full object-cover border-4 border-gray-700' />
          ) : (
            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-white">{userData?.name}</h2>
          <p className='text-sm text-white/90'>{userData?.role}</p>
        </div>
        <div className='mt-6 space-y-4'>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-white/90'>Email:</span>
            <span className='text-white'>{userData?.email}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-white/90'>Bio:</span>
            <span className='text-white'>{userData?.description}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2'>
            <span className='font-semibold text-white/90'>Enrolled Courses:</span>
            <span className='text-white'>{userData?.enrolledCourses?.length ?? 0}</span>
          </div>
        </div>
        <div className='mt-6 flex justify-center gap-4'>
          <button onClick={() => navigate('/profile/edit')} type="button" className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
