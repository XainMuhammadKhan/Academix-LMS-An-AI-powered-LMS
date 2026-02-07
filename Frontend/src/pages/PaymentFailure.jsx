import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentFailure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qs = new URLSearchParams(location.search);
  const sessionId = qs.get('session_id');

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-lg w-full text-center'>
        <h2 className='text-2xl font-semibold mb-4 text-red-600'>Payment Failed or Cancelled</h2>
        <p className='mb-4'>Your payment was not completed. You can try again or return to the course.</p>
        <p className='mb-6 text-sm text-gray-600'>Session: {sessionId || 'N/A'}</p>
        <div className='flex justify-center gap-4'>
          <button onClick={() => navigate(-1)} className='px-6 py-2 bg-gray-200 rounded'>Back</button>
          <button onClick={() => navigate('/home')} className='px-6 py-2 bg-black text-white rounded'>Go to Dashboard</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure
