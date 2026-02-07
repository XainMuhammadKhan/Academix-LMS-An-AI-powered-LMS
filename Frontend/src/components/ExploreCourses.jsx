import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiViaplay, SiOpenaigym, SiGoogledataproc } from 'react-icons/si';
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { IoLogoAndroid } from "react-icons/io";
import { FaHackerrank } from "react-icons/fa6";
import { AiFillOpenAI } from "react-icons/ai";
import { BsClipboard2DataFill } from "react-icons/bs";

const courseCategories = [
  { icon: <TbDeviceDesktopAnalytics />, label: "Web Development", color: "#fbd9fb" },
  { icon: <LiaUikit />, label: "UI/UX Designing", color: "#d9fbe0" },
  { icon: <IoLogoAndroid />, label: "App Development", color: "#d9e1fb" },
  { icon: <FaHackerrank />, label: "Ethical Hacking", color: "#fbd9d9" },
  { icon: <AiFillOpenAI />, label: "Artificial Intelligence", color: "#d9f9fb" },
  { icon: <SiGoogledataproc />, label: "Data Science", color: "#fbe4d9" },
  { icon: <BsClipboard2DataFill />, label: "Data Analytics", color: "#f2fbd9" },
  { icon: <SiOpenaigym />, label: "AI Tools", color: "#dcfbd9" },
];

function ExploreCourses() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen lg:min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-12 bg-white">
      
      {/* Left Content Column */}
      <div className="w-full lg:w-1/3 flex flex-col items-start text-left space-y-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Explore <br /> 
          <span className="text-gray-800">Our Courses</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Dive into our comprehensive catalog of industry-leading courses. 
          Master new skills with AI-powered learning paths designed for your success.
        </p>
        
        <button 
          onClick={() => navigate('/allcourses')} 
          className="group relative overflow-hidden px-8 py-4 bg-gray-900 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 mt-6"
        >
          {/* Animated Shine Effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          
          <span className="relative z-10 flex items-center gap-2">
            Explore Courses <SiViaplay className="w-5 h-5" />
          </span>
        </button>
      </div>

      {/* Right Grid Column */}
      <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {courseCategories.map((course, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-2"
          >
            <div 
              style={{ backgroundColor: course.color }} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shadow-sm"
            >
              {/* React.cloneElement allows us to pass classes to the icon component safely */}
              {React.cloneElement(course.icon, { 
                className: "w-12 h-12 text-gray-900" 
              })}
            </div>
            <span className="text-sm font-semibold text-gray-700 text-center max-w-[100px]">
              {course.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreCourses;
