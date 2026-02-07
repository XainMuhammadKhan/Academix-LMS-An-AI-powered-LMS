import React from 'react'
import about from '../assets/about.jpg'
import video from '../assets/video.mp4'
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import { BsFillPatchCheckFill } from 'react-icons/bs';
function About() {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
        {/* for image */}
      <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center'>
        <div className='flex w-[80%] gap-4 items-center'>
          <img src={about} alt="About us" className='w-3/5 h-auto object-cover rounded-lg shadow-md'/>
          <div className='w-2/5 hidden sm:block'>
            <video src={video} controls loop muted playsInline className='w-full h-full object-cover rounded-lg shadow-lg border-2 border-[#CB99C7]/20'/>
          </div>
        </div>
      </div>
      
      {/* for about info */}
      <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[20px] md:px-[80px]'>
        <div className='flex text-[20px] items-center justify-center gap-[20px]'>About Us <TfiLayoutLineSolid className='w-[40px] h-[40px] text-[#CB99C7]'/></div>
        <div className="md:text-[45px] text-[35px] font-semibold">Maximize Your Learning Growth With Us!</div>
        <div className='text-[15px]'>We provide a modern Learn Management System to simplify online education, track progress, and enhance Student-Instructor collaboration efficiently</div>
        <div className='w-[100%] lg:w-[60%]'>
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <div className="flex items-center gap-3 text-sm"><BsFillPatchCheckFill className='text-[#CB99C7] text-lg flex-shrink-0'/>Simplified Learning</div>
            <div className="flex items-center gap-3 text-sm"><BsFillPatchCheckFill className='text-[#CB99C7] text-lg flex-shrink-0'/>Expert Instructors</div>
            <div className="flex items-center gap-3 text-sm"><BsFillPatchCheckFill className='text-[#CB99C7] text-lg flex-shrink-0'/>Big Experience</div>
            <div className="flex items-center gap-3 text-sm"><BsFillPatchCheckFill className='text-[#CB99C7] text-lg flex-shrink-0'/>Lifetime Access</div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default About
