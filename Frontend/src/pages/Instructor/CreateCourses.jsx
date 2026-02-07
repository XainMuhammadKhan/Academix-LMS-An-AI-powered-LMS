import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import homenew from '../../assets/homenew.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { serverURL } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData, setCourseData } from '../../redux/courseSlice'
import img from '../../assets/empty.jpg'

function CreateCourses() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [level, setLevel] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const fileRef = useRef(null)
  const previewRef = useRef(null)
  const { courseData } = useSelector(state => state.course)
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const existingCourses = useSelector(state => state.course.creatorCourseData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !category) return toast.error('Please provide title and category')
    setLoading(true)
    try {
      const cleanPriceValue = (val) => {
        const cleaned = String(val ?? '').replace(/[^0-9.-]+/g, '')
        if (cleaned === '') return undefined
        const n = Number(cleaned)
        return Number.isNaN(n) ? undefined : n
      }
      const priceToSend = cleanPriceValue(price)

      let result
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
        result = await axios.post(serverURL + '/api/course/create', form, { withCredentials: true })
      } else {
        const payload = { title: title.trim(), subtitle: subtitle.trim() || undefined, category, level, price: priceToSend, description, isPublished }
        result = await axios.post(serverURL + '/api/course/create', payload, { withCredentials: true })
      }

      const created = result.data.course || result.data
      try {
        const updated = Array.isArray(existingCourses) ? [created, ...existingCourses] : [created]
        dispatch(setCreatorCourseData(updated))
      } catch (e) { console.error('Failed to update local course state', e) }

      // if created course is published, also insert into published courseData
      try {
        if (created?.isPublished) {
          const existingPublished = Array.isArray(courseData) ? courseData : []
          dispatch(setCourseData([created, ...existingPublished]))
        }
      } catch (e) { console.error('Failed to sync published courses', e) }

      setLoading(false)
      toast.success('Course Created')
      navigate('/courses')
    } catch (err) {
      console.error('create-course error', err)
      toast.error(err?.response?.data?.message || 'Failed to create course')
      setLoading(false)
    }
  }

  const onSelectFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    try {
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
      }
      const url = URL.createObjectURL(file)
      previewRef.current = url
      setFrontendImage(url)
    } catch (e) { console.error('Preview error', e) }
  }

  const triggerFile = () => fileRef.current?.click()
  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>

      <div className='backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-xl w-full relative z-20 border border-white/20'>
        <button
          onClick={() => navigate('/courses')}
          aria-label='Back to courses'
          className='absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-gray-900 border border-black/10 shadow-md cursor-pointer'
        >
          <FaArrowLeft className='w-4 h-4' />
        </button>

        <h2 className='text-2xl font-bold text-white text-center mb-6'>Create Course</h2>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title' className='block text-sm text-white/90 mb-1'>Course Title</label>
            <input
              type='text'
              id='title'
              name='title'
              className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor='subtitle' className='block text-sm text-white/90 mb-1'>Subtitle</label>
            <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>

          <div>
            <label htmlFor='cat' className='block text-sm text-white/90 mb-1'>Course Category</label>
            <CategorySelect value={category} onChange={setCategory} disabled={loading} />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Level</label>
            <LevelSelect value={level} onChange={setLevel} disabled={loading} />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Price</label>
            <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-40 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' placeholder='e.g. 49.99' />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20' rows={4} />
          </div>

          <div>
            <label className='block text-sm text-white/90 mb-1'>Thumbnail</label>
            <div>
              <div onClick={triggerFile} role='button' className='w-32 h-20 rounded-md overflow-hidden bg-white/5 flex items-center justify-center cursor-pointer border border-white/10'>
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

          <div className='flex items-center gap-3'>
            <label className='text-sm text-white/90'>Publish now</label>
            <input type='checkbox' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} />
          </div>

          <div className='flex gap-3'>
            <button
              type='submit'
              disabled={loading}
              className={`group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 ${loading ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}`}
            >
              <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out'></span>
              <span className='relative z-10 flex items-center'>
                {loading && (
                  <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                  </svg>
                )}
                {loading ? 'Creating...' : 'Create Course'}
              </span>
            </button>
            <button type='button' onClick={() => navigate('/dashboard')} className='px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses

// Small themed custom select component to replace the native dropdown
function CategorySelect({ value, onChange, disabled }) {
  const options = ['App Development','AI/ML','Data Science','Data Analytics','Ethical Hacking','UI/UX Design','Web Development','Cloud Computing','Cybersecurity','Others']
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const handleSelect = (opt) => {
    if (onChange) onChange(opt)
    setOpen(false)
  }

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setOpen(v => !v)}
        disabled={disabled}
        className={`w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 flex items-center justify-between ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <span className={value ? 'text-white' : 'text-white/70'}>{value || 'Select Category'}</span>
        <svg className='w-4 h-4 text-white/80' viewBox='0 0 20 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z' clipRule='evenodd' />
        </svg>
      </button>

      {open && (
        <ul className='absolute z-40 mt-1 right-0 left-0 bg-gray-800 border border-white/10 rounded-md max-h-56 overflow-auto py-1 shadow-lg'>
          {options.map(opt => (
            <li key={opt} onClick={() => handleSelect(opt)} className='px-4 py-2 hover:bg-gray-700 cursor-pointer text-white'>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function LevelSelect({ value, onChange, disabled }) {
  const options = ['Beginner','Intermediate','Advanced']
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const handleSelect = (opt) => { if (onChange) onChange(opt); setOpen(false) }

  return (
    <div ref={ref} className='relative'>
      <button type='button' onClick={() => setOpen(v=>!v)} disabled={disabled} className={`w-56 rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 flex items-center justify-between ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
        <span className={value ? 'text-white' : 'text-white/70'}>{value || 'Select Level'}</span>
        <svg className='w-4 h-4 text-white/80' viewBox='0 0 20 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z' clipRule='evenodd' />
        </svg>
      </button>
      {open && (
        <ul className='absolute z-40 mt-1 right-0 left-0 bg-gray-800 border border-white/10 rounded-md max-h-56 overflow-auto py-1 shadow-lg'>
          {options.map(opt => (
            <li key={opt} onClick={() => handleSelect(opt)} className='px-4 py-2 hover:bg-gray-700 cursor-pointer text-white'>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
