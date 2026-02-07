import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar";
import homenew from '../assets/homenew.png'
import { FaArrowLeftLong }  from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png";
import img from '../assets/empty.jpg'
import { useSelector } from 'react-redux';
import Card from '../components/Card';
function AllCourses() {
    const navigate = useNavigate()
    const { courseData } = useSelector(state=>state.course)
    const [category, setCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const[filterCourses,setFilterCourses]=useState(Array.isArray(courseData) ? courseData : []);
    const toggleCategory = (e)=>{
        if (category.includes(e.target.value)) {
            setCategory(prev=>prev.filter(c=>c!==e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }

    const applyFilter = ()=>{
        const source = Array.isArray(courseData) ? courseData : [];
        let courseCopy = source.slice();
        if(category.length>0){
            courseCopy = courseCopy.filter(c=>category.includes(c.category))
        }
        const q = String(searchTerm || '').trim().toLowerCase()
        if(q) {
            courseCopy = courseCopy.filter(c => {
                const title = String(c.title || '').toLowerCase()
                const subtitle = String(c.subtitle || '').toLowerCase()
                const cat = String(c.category || '').toLowerCase()
                return title.includes(q) || subtitle.includes(q) || cat.includes(q)
            })
        }
        setFilterCourses(courseCopy)
    }
    useEffect(
        ()=>{
            setFilterCourses(Array.isArray(courseData) ? courseData : [])
        },[courseData]
    )
    useEffect(
        ()=>{
            applyFilter()
        },[category, searchTerm]
    )
    return (
        <div className='w-full min-h-screen bg-white relative' style={{ backgroundImage: `url(${homenew})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='absolute inset-0 bg-black/30'></div>
            <Navbar/>
      {/* sidebar */}
            <aside className="hidden md:block w-[260px] h-screen overflow-y-auto fixed top-0 left-0 p-6 py-[130px] border-r border-white/10 shadow-md transitio-transform duration-300 z-20">
                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-white mb-6'><FaArrowLeftLong className='text-white' onClick={()=>navigate("/")}/> Filter by Category</h2>
                <form action="" onSubmit={(e)=>{e.preventDefault(); applyFilter()}} className='space-y-4 text-sm backdrop-blur-xl bg-white/10 text-white border border-white/10 p-5 rounded-2xl'>
                        <button type='button' onClick={()=>navigate('/search')} className='group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-[15px] font-medium flex items-center justify-center gap-2 w-full'>
                            <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out'></span>
                            <span className='relative z-10 flex items-center gap-2'>Search With AI <img className='w-[28px] h-[28px] rounded-full' src={ai} alt="" /></span>
                        </button>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'Web Development'} onChange={toggleCategory}/> <span>Web Development</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'UI/UX Designing'} onChange={toggleCategory}/> <span>UI/UX Designing</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'App Development'} onChange={toggleCategory}/> <span>App Development</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'Ethical Hacking'} onChange={toggleCategory}/> <span>Ethical Hacking</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'AI/ML'} onChange={toggleCategory}/> <span>AI/ML</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'Data Science'} onChange={toggleCategory}/> <span>Data Science</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'Data Analytics'} onChange={toggleCategory}/> <span>Data Analytics</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'AI Tools'} onChange={toggleCategory}/> <span>AI Tools</span>
            </label>
            <label className='flex items-center gap-3'>
                <input type="checkbox" className='accent-indigo-500 w-4 h-4 rounded-md' value={'Others'} onChange={toggleCategory}/> <span>Others</span>
            </label>
        </form>
      </aside>
            <main className="w-full transition-all duration-300 py-[120px] md:pl-[320px] px-[20px]">
                <div className='max-w-7xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10'>
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-2xl font-bold text-white'>All Courses</h1>
                        <div className='hidden sm:flex items-center gap-3'>
                            <input placeholder='Search courses...' value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); applyFilter() } }} className='px-4 py-2 rounded-md bg-white/10 text-white border border-white/10' />
                            <button onClick={applyFilter} className='group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-transparent'>Search</button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            filterCourses?.map((course,index)=>(
                                <Card
                                    key={course._id || index}
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
            </main>
        </div>
  )
}

export default AllCourses
