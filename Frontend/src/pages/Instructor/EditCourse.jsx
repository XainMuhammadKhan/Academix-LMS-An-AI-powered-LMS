import React, { useEffect, useState, useRef } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import homenew from '../../assets/homenew.png'
import img from '../../assets/empty.jpg'
import axios from 'axios'
import { toast } from 'react-toastify'
import { serverURL } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData, setCourseData } from '../../redux/courseSlice'

export default function EditCourse(){
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const fileRef = useRef(null)
  const previewRef = useRef(null)
  const {courseData} = useSelector(state => state.course)

  useEffect(()=>{
    if (!id) return
    const fetchCourse = async ()=>{
      try{
        const res = await axios.get(serverURL + `/api/course/getcourse/${id}`, { withCredentials: true })
        const data = res?.data?.course
        if (!data) {
          toast.error('Course not found')
          return
        }
        setCourse(data)
        setTitle(data.title || '')
        setSubtitle(data.subtitle || '')
        setCategory(data.category || '')
        setLevel(data.level || '')
        setPrice(data.price || '')
        setDescription(data.description || '')
        setIsPublished(!!data.isPublished)
        setBackendImage(data.thumbnailUrl || null)
        setFrontendImage(data.thumbnailUrl || null)
      }catch(err){
        console.error('Failed to fetch course', err)
        toast.error(err?.response?.data?.message || 'Failed to fetch course')
      }
    }
    fetchCourse()
  },[id])

  const dispatch = useDispatch()
  const existingCourses = useSelector(state => state.course.creatorCourseData)

  const handleSave = async () => {
    if (!title.trim()) return toast.error('Title is required')
    setLoading(true)
    try{
      // sanitize price on client to avoid backend cast errors
      const cleanPriceValue = (val) => {
        const cleaned = String(val ?? '').replace(/[^0-9.-]+/g, '');
        if (cleaned === '') return undefined;
        const n = Number(cleaned);
        return Number.isNaN(n) ? undefined : n;
      }
      const priceToSend = cleanPriceValue(price);
      // send multipart form data if a new thumbnail is selected
      let res
      if (thumbnailFile) {
        const form = new FormData()
        form.append('title', title.trim())
        if (subtitle.trim()) form.append('subtitle', subtitle.trim())
        if (category) form.append('category', category)
        if (level) form.append('level', level)
        if (priceToSend !== undefined) form.append('price', priceToSend)
        if (description) form.append('description', description)
        form.append('isPublished', isPublished)
        form.append('thumbnail', thumbnailFile)
        res = await axios.post(serverURL + `/api/course/editcourse/${id}`, form, { withCredentials: true })
      } else {
        const payload = { title: title.trim(), subtitle: subtitle.trim() || undefined, category, level, price: priceToSend, description, isPublished }
        res = await axios.post(serverURL + `/api/course/editcourse/${id}`, payload, { withCredentials: true })
      }
      console.log('edit response', res.data)
      const updated = res?.data?.course || null
      if (updated) {
        try {
          const updatedList = Array.isArray(existingCourses)
            ? existingCourses.map(c => (c._id === updated._id ? updated : c))
            : [updated]
          dispatch(setCreatorCourseData(updatedList))
        } catch (e) { console.error('Failed to update redux course list', e) }
        // synchronize published courses list (courseData)
        try {
          const updatedData = updated
          const existingPublished = Array.isArray(courseData) ? courseData : []
          if (updatedData.isPublished) {
            // replace if exists, otherwise append
            let replaced = false
            const replacedList = existingPublished.map(c => {
              if (c._id === updatedData._id) { replaced = true; return updatedData }
              return c
            })
            const finalList = replaced ? replacedList : [...replacedList, updatedData]
            dispatch(setCourseData(finalList))
          } else {
            // if course was unpublished, remove from published list
            const filtered = existingPublished.filter(c => c._id !== updatedData._id)
            if (filtered.length !== existingPublished.length) dispatch(setCourseData(filtered))
          }
        } catch (e) { console.error('Failed to sync published courses', e) }
        // sync thumbnail urls
        if (updated.thumbnailUrl) {
          setBackendImage(updated.thumbnailUrl)
          // if preview was an object URL, revoke it
          if (previewRef.current && previewRef.current.startsWith('blob:')) {
            try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
            previewRef.current = null
          }
          setFrontendImage(updated.thumbnailUrl)
        }
      }
      toast.success('Course updated')
      navigate('/courses')
    }catch(err){
      console.error('Edit failed', err)
      toast.error(err?.response?.data?.message || 'Failed to update course')
    }finally{ setLoading(false) }
  }

  

  const onSelectFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    try {
      // revoke previous object url if present
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
      }
      const url = URL.createObjectURL(file)
      previewRef.current = url
      setFrontendImage(url)
    } catch (e) {
      console.error('Preview error', e)
    }
  }

  const triggerFile = () => fileRef.current?.click()

  const categoryOptions = ['App Development','AI/ML','Data Science','Data Analytics','Ethical Hacking','UI/UX Design','Web Development','Cloud Computing','Cybersecurity','Others']
  const levelOptions = ['Beginner','Intermediate','Advanced']
  
  const handleRemoveCourse = async ()=>{
    setLoading(true)
    try {
      const res = await axios.delete(`${serverURL}/api/course/delete/${id}`, { withCredentials: true })
      const filterCourse= courseData.filter((item) => item._id !== id);
      dispatch(setCreatorCourseData(filterCourse));
      console.log('delete-course response', res.data)
      // update redux list: remove locally if available, otherwise refetch
      try {
        if (Array.isArray(existingCourses)) {
          const filtered = existingCourses.filter(c => c._id !== id)
          dispatch(setCreatorCourseData(filtered))
        } else {
          const fresh = await axios.get(serverURL + '/api/course/getcreator', { withCredentials: true })
          const payload = fresh?.data?.courses || fresh?.data || []
          dispatch(setCreatorCourseData(payload))
        }
      } catch (e) { console.error('Failed to update redux after delete', e) }

      setLoading(false)
      toast.success('Course Deleted Successfully!')
      navigate('/courses')
    } catch (error) {
      console.error('Delete failed', error)
      setLoading(false)
      toast.error('Failed to delete course')
    }
  }

  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>
      <div className='backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-3xl w-full relative z-20 border border-white/20'>
        <button
          onClick={() => navigate('/courses')}
          aria-label='Back to courses'
          className='absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-gray-900 border border-black/10 shadow-md cursor-pointer'
        >
          <FaArrowLeft className='w-4 h-4' />
        </button>

        <div className='mb-6 flex items-center'>
          <h2 className='text-2xl font-bold text-white text-center flex-1'>Edit Course</h2>
          <button onClick={() => navigate(`/createLecture/${course?._id}`)} aria-label='Go to lectures' className={`group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700`}>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className='relative z-10'>Go to Lectures</span>
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm text-white/90 mb-1'>Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Subtitle</label>
            <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Category</label>
            <CustomSelect value={category} onChange={setCategory} options={categoryOptions} placeholder='Select Category' className='w-full' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Level</label>
            <CustomSelect value={level} onChange={setLevel} options={levelOptions} placeholder='Select Level' className='w-56' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Price</label>
            <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-40 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' rows={4} />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Thumbnail</label>
            <div>
              <div
                onClick={triggerFile}
                role='button'
                aria-label='Choose thumbnail image'
                className='w-32 h-20 rounded-md overflow-hidden bg-white/5 flex items-center justify-center cursor-pointer border border-white/10'
              >
                {frontendImage ? (
                  <img src={frontendImage} alt='thumbnail' className='object-cover w-full h-full' />
                ) : (
                  <div className='text-white/70 text-sm'>Choose image</div>
                )}
              </div>
              <div className='text-white/70 text-xs mt-2'>PNG, JPG up to 5MB</div>
            </div>
            <input ref={fileRef} onChange={onSelectFile} accept='image/*' type='file' className='hidden' />
          </div>

          <div className='flex items-center justify-between gap-4'>
            <div>
              <span className='text-sm text-white/90 mr-3'>Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs ${isPublished ? 'bg-green-500 text-green-100' : 'bg-red-600/20 text-red-100'}`}>{isPublished ? 'Published' : 'Draft'}</span>
            </div>
            <div className='flex items-center gap-3'>
              <button onClick={() => setIsPublished(p => !p)} className='px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20'>{isPublished ? 'Unpublish' : 'Publish'}</button>
              <button onClick={handleRemoveCourse} className='px-4 py-2 bg-red-600 text-white rounded-lg'>Delete</button>
            </div>
          </div>

          <div className='flex items-center gap-3 justify-end'>
            <button onClick={() => navigate('/dashboard')} className='px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20'>Cancel</button>
            <button onClick={handleSave} disabled={loading} className={`group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
              <span className='relative z-10'>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// small custom select to ensure dropdown is visible on dark backgrounds
function CustomSelect({ value, onChange, options = [], placeholder = 'Select', className = '' }){
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)
  React.useEffect(()=>{
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type='button' onClick={() => setOpen(v => !v)} className='w-full text-left px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 flex items-center justify-between'>
        <span className={value ? 'text-white' : 'text-white/70'}>{value || placeholder}</span>
        <svg className='w-4 h-4 text-white/80' viewBox='0 0 20 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z' clipRule='evenodd' />
        </svg>
      </button>
      {open && (
        <ul className='absolute z-50 mt-1 right-0 left-0 bg-gray-800 border border-white/10 rounded-md max-h-56 overflow-auto py-1 shadow-lg'>
          {options.map(opt => (
            <li key={opt} onClick={() => { onChange(opt); setOpen(false) }} className='px-4 py-2 hover:bg-gray-700 cursor-pointer text-white'>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
