import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import ai from "../assets/SearchAi.png";
import { RiMicAiFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverURL } from '../App';
import start from "../assets/start.mp3"
import axios from 'axios'
function SearchWithAi() {
  const startSound = new Audio(start)
  const navigate= useNavigate()
  const [input, setInput] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [listening, setListening] = useState(false)


  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  if (!recognition) {
    toast.error("Speech Recognition is not supported in this browser.");
  }

  const handleSearch=async()=>{
    if (!recognition) return;
    setListening(true)
    recognition.start();
    startSound.play();
    recognition.onresult = async (e) => {
           const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript)
      }
  }

  const handleRecommendation = async (query) =>{
    try {
      const result = await axios.post(serverURL+"/api/course/search", {input:query},
        {withCredentials:true}
      )
      console.log(result.data)
      setRecommendations(result.data)
      setListening(false)
      if (result.data.length>0) {
        speak("These are the top courses I found for you")
      } else {
        speak("No courses found")
      }
    }catch(error){
      console.log(error)
      toast.error(error?.response?.data?.message || 'Search failed, check server logs')
      setListening(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1'>
      

    {/* Search Container */}

    <div className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative border border-gray-700">
    <FaArrowLeftLong className='text-white w-[22px] h-[22px] cursor-pointer absolute left-4 top-4' onClick={()=>navigate(-1)}/>
    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
      <img src={ai} alt="AI" className='w-12 h-12 sm:w-14 sm:h-14 object-contain inline-block mr-2'/>
      Search with <span className='text-[#CB99C7]'>AI</span>
    </h1>

    <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
      <input type="text" name="" id="" placeholder='What do you want to learn? (e.g. AI, MERN, Cloud...)' className='flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base' value={input} onChange={(e) => setInput(e.target.value)}/>
      {input && <button className='absolute right-14 sm:right-16 bg-[#CB99C7] rounded-full' onClick={()=>handleRecommendation(input)}><img src={ai} alt="" className='w-10 h-10 p-2 rounded-full'/></button>}
      <button className='absolute right-2 bg-[#CB99C7] rounded-full w-10 h-10 flex items-center justify-center' onClick={handleSearch}>
        <RiMicAiFill className="w-5 h-5 text-white"/>
      </button>
    </div>
    </div>
    {recommendations.length>0?(<div className='w-full max-w-6xl mt-12 px-2 sm:px-4'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-6 text-white text-center'>AI Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {
          recommendations?.map((course,index)=>(
            <div key={index} className='bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200' onClick={()=>navigate(`/viewcourse/${course._id}`)}>
              <h2 className="text-lg font-bold sm:text-xl">{course.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {course.category}
              </p>
            </div>
          ))
        }
        <div></div>
      </div>
    </div>):(listening?<h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>Listening...</h1>:<h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>No Courses Found yet</h1>)}

    </div>
  )
}

export default SearchWithAi
