import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
function Footer() {
  const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-br from-gray-900 to-black text-gray-300 py-10 px-6'>
      <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>
        <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
          <img src={logo} alt="Logo" className='h-10 mb-3 rounded-[5px]'/>
          <h2 className='text-xl font-bold text-white mb-3'>AcademiX LMS</h2>
          <p className='text-sm text-gray-300'>AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.</p>
        </div>
        <div className='lg:w-[30%] md:w-[100%]'>
          <div className='text-white font-semibold mb-2'>Quick Links</div>
          <ul className='text-sm space-y-1'>
            <li className='hover:text-[#CB99C7] cursor-pointer ' onClick={()=>navigate("/")}>Home</li>
          <li className='hover:text-[#CB99C7] cursor-pointer' onClick={()=>navigate("/allcourses")}>All Courses</li>
          <li className='hover:text-[#CB99C7] cursor-pointer' onClick={()=>navigate("/login")}>Login</li>
          <li className='hover:text-[#CB99C7] cursor-pointer' onClick={()=>navigate("/profile")}>My Profile</li>
          </ul>
        </div>
        <div>
           <div className='text-white font-semibold mb-2'>Categories</div>
          <ul className='text-sm space-y-1'>
            <li className='hover:text-[#CB99C7] cursor-pointer '>Web Development</li>
          <li className='hover:text-[#CB99C7] cursor-pointer'>App Development</li>
          <li className='hover:text-[#CB99C7] cursor-pointer'>Artificial Intelligence</li>
          <li className='hover:text-[#CB99C7] cursor-pointer'>Cybersecurity</li>
          </ul>
        </div>
      </div>
      <div className='border-t border-gray-800 mt-10 pt-5 text-sm text-center text-gray-500'>© {new Date().getFullYear()} AcademiX LMS. All rights reserved.</div>
    </div>
  )
}

export default Footer
