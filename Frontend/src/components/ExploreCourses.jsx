import React from 'react'
import { SiViaplay } from 'react-icons/si'
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { IoLogoAndroid } from "react-icons/io";
import { FaHackerrank } from "react-icons/fa6";
import { AiFillOpenAI } from "react-icons/ai";
import { SiOpenaigym } from "react-icons/si";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboard2DataFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';




function ExploreCourses() {
  const navigate = useNavigate()
  return (
    <div className='w-[100] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] -mt-6 lg:-mt-8'>
        {/* left/top div */}
        <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>
            <span className='text-[35px] font-semibold'>Explore</span>
            <span className='text-[35px] font-semibold'>Our Courses</span>
            <p className='text-[17px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem recusandae cupiditate sit! Aut fugit nobis dolores a pariatur laborum.</p>
            <button onClick={() => navigate('/allcourses')} className='group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 flex items-center gap-3 mt-[40px]'>
              <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out'></span>
              <span className='relative z-10 flex items-center gap-2'>Explore Courses <SiViaplay className='w-5 h-5'/></span>
            </button>
        </div>
        {/* right/bottom div */}
        <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            Web Development
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <LiaUikit className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            UI/UX Designing
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#d9e1fb] rounded-lg flex items-center justify-center'>
            <IoLogoAndroid className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            App Development
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbd9d9] rounded-lg flex items-center justify-center'>
            <FaHackerrank className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            Ethical Hacking
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#d9f9fb] rounded-lg flex items-center justify-center'>
            <AiFillOpenAI className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            Artificial Intelligence
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbe4d9] rounded-lg flex items-center justify-center'>
            <SiGoogledataproc className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            Data Science
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#f2fbd9] rounded-lg flex items-center justify-center'>
            <BsClipboard2DataFill className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            Data Analytics
            </div>
            <div className='w-[100px] h-[130px]  text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#dcfbd9] rounded-lg flex items-center justify-center'>
            <SiOpenaigym className='w-[60px] h-[60px] text-[#000000]'/>
            </div>
            AI Tools
            </div>
        </div>
    </div>
  )
}

export default ExploreCourses
