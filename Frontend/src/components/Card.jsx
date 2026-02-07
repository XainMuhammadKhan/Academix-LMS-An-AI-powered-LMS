import React from 'react'
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Card({thumbnail, title, category, price, id, reviews}) {
  const navigate = useNavigate();
  
  // Calculate average rating from reviews array
  const avgRating = reviews && reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : '—';
  const reviewCount = reviews ? reviews.length : 0;
  
  return (
    <div className='max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 cursor-pointer' onClick={() => navigate(`/viewcourse/${id}`)}>
      <img src={thumbnail} alt={title} className='w-full h-48 object-cover'/>
      <div className='p-5 space-y-2'>
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize text-xs">{category}</span>
        <div className='flex justify-between items-center text-sm text-gray-600 mt-3 px-[10px]'>
            <span className='font-semibold text-gray-800'> ${price}</span>
            <span className='flex items-center gap-1'>
              <FaStar className='text-yellow-500'/>
              <span className='font-medium'>{avgRating}</span>
              <span className='text-xs text-gray-500'>({reviewCount})</span>
            </span>
        </div>
      </div>
    </div>
  )
}

export default Card
