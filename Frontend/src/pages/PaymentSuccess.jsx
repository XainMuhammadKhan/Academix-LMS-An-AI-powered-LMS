import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import Landing from '../assets/landing.png'

const PaymentSuccess = () => {
  const [status, setStatus] = useState('Verifying payment...')
  const location = useLocation();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const sessionId = qs.get('session_id');
    if (!sessionId) {
      setStatus('No session id provided');
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/course/verify-session`, { sessionId }, { withCredentials: true });
        if (res.data?.message) setStatus('Payment verified — you are enrolled!');
        else setStatus('Payment verified');
      } catch (err) {
        console.error('Verify session error', err);
        setStatus(err?.response?.data?.message || 'Failed to verify payment.');
      }
    }
    verify();
  }, [location.search])

  return (
    <div className='min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${Landing})`, backgroundSize: 'cover' }}>
      <div className='bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-lg w-full mx-4 border border-white/10'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Payment Status</h2>
        <p className='mb-6 text-white/90'>{status}</p>
        <div className='flex justify-center gap-4'>
          <Link to='/profile' className='group relative overflow-hidden'>
            <button className='relative z-10 px-6 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>
              Go to My Courses
            </button>
            <span className='absolute left-0 top-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 w-32 h-full bg-white/10 mix-blend-overlay rounded-md' />
          </Link>
          <Link to='/'>
            <button className='px-6 py-2 rounded-md border border-white/20 text-white/90'>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
