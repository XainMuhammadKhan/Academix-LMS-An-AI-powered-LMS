import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card';
import img from '../assets/empty.jpg'

function CardPage() {
    const {courseData} = useSelector(state => state.course);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    useEffect(() => {
      const normalized = Array.isArray(courseData) ? courseData : (courseData?.courses || []);
      setFeaturedCourses(normalized.slice(0,6));
    },[courseData])
  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>Featured Courses</h1>
      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore top-rated courses curated to boost your skills, enhance your knowledge, unlock new opportunities and advance your career in AI, Business and many more.</span>
      <div className='w-[100%] min-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
       {
        featuredCourses && featuredCourses.map((course,index)=>(
            <Card
              key={index}
              thumbnail={course.thumbnailUrl || course.thumbnail || img}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
              reviews={course.reviews || []}
            />
        ))
       } 
      </div>
    </div>
  )
}

export default CardPage
