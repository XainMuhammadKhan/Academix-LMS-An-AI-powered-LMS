import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import landingBg from '../assets/landing.png'
import logo from '../assets/logo.png'

const Landing = () => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.user.userData)

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (userData) {
      navigate('/home', { replace: true })
    }
  }, [userData, navigate])

  return (
    <div 
      className='min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center'
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/40'></div>
      
      {/* Content */}
      <div className='relative z-10 text-center px-6 max-w-5xl'>
        {/* Logo */}
        <div className='flex justify-center -mb-14'>
          <img 
            src={logo} 
            alt="AcademiX Logo" 
            className='w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-2xl animate-pulse'
          />
        </div>

        {/* Hero Text */}
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg'>
          Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400'>AcademiX</span>
        </h1>
        
        <p className='text-xl md:text-2xl lg:text-3xl text-gray-200 mb-4 font-light drop-shadow-md'>
          Your Gateway to Limitless Learning
        </p>
        
        <p className='text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-md'>
          Join thousands of students and Instructors transforming education through our innovative learning management system
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <button
            onClick={() => navigate('/register')}
            className='px-8 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white text-lg font-semibold rounded-xl hover:from-gray-800 hover:via-gray-900 hover:to-gray-800 transition-all transform hover:scale-105 shadow-2xl border border-gray-700 w-full sm:w-auto'
          >
            Get Started Free
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className='px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto'
          >
            Sign In
          </button>
        </div>

        {/* Feature Pills */}
        <div className='mt-16 flex flex-wrap justify-center gap-4'>
          <div className='px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium'>
            📚 Interactive Courses
          </div>
          <div className='px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium'>
            🎓 Expert Instructors
          </div>
          <div className='px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium'>
            ⚡ Real-time Progress
          </div>
          <div className='px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium'>
            🏆 Certifications
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
