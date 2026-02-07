import React from "react";
import Navbar from "../components/Navbar";
import homenew from "../assets/homenew.png";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="w-full relative">
        <Navbar />

        {/* Image container */}
        <div className="-mt-[70px]">
          <img
            src={homenew}
            alt="home"
            className="w-full h-auto block mx-auto"
          />
        </div>

        {/* Text overlay - positioned relative to the image container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-6 md:mt-12 lg:-mt-60 px-4 z-10">
          <span className="font-bold text-3xl md:text-5xl lg:text-7xl text-center mb-4 md:mb-6 lg:mb-8 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_100%)]">
            Grow Your Skills with AcademiX
          </span>
          <span className="font-bold text-xl md:text-3xl lg:text-5xl text-center tracking-tight text-white mb-6 md:mb-8 lg:mb-12 drop-shadow-[0_8px_16px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_100%)]" onClick={()=>navigate("/allcourses")}>
            Your Career Path
          </span>
          <div className="flex gap-4">
            <button onClick={() => navigate('/allcourses')} className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10 flex items-center gap-2">View All Courses <SiViaplay /></span>
            </button>

            <button className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10 flex items-center gap-2" onClick={()=>navigate('/search')}>Search With AI <img src={ai} alt="AI" className="w-[30px] h-[30px] rounded-full " /></span>
            </button>
          </div>
          
        </div>
      </div>
      <Logos/>
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <Footer/>
    </div>
  );
};

export default Home;