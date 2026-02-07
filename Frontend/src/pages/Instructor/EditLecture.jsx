import React, { useState, useEffect, useRef } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { serverURL as serverUrl } from '../../App'
import homenew from '../../assets/homenew.png'
import { setlectureData } from '../../redux/LectureSlice'

function EditLecture() {
  const {courseId, lectureId} = useParams();
  const dispatch = useDispatch();
  const {lectureData}=useSelector(state=>state.lecture || {});
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const fileRef = useRef(null)
  const [videoLink, setVideoLink] = useState('')
  const [videoMode, setVideoMode] = useState('file') // 'file' or 'link'
  const [isPreviewFree, setIsPreviewFree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const initializedRef = useRef(false)

  // initialize local state from redux or server only once to avoid overwriting user edits
  useEffect(()=>{
    const populate = (found) => {
      setLectureTitle(found.lectureTitle || '');
      setDescription(found.lectureDescription || '');
      setVideoLink(found.videoUrl || '');
      setIsPreviewFree(Boolean(found.isPreviewFree));
      if (found.videoUrl && typeof found.videoUrl === 'string') setVideoMode('link')
      initializedRef.current = true
    }

    const found = lectureData?.find(l => l._id === lectureId);
    if (found && !initializedRef.current) {
      populate(found)
      return
    }

    if (!initializedRef.current) {
      (async ()=>{
        try {
          const res = await axios.get(serverUrl + `/api/course/getlecture/${courseId}`, { withCredentials: true });
          const lectures = res?.data?.lectures || [];
          dispatch(setlectureData(lectures));
          const f = lectures.find(l=>l._id === lectureId);
          if (f) populate(f)
        } catch (err) {
          console.error('fetch lectures error', err);
        }
      })()
    }
  }, [lectureData, lectureId, courseId, dispatch])

  // reset initialization when switching to a different lecture
  useEffect(()=>{
    initializedRef.current = false
  }, [lectureId])

  const handleBack = () => navigate(`/instructor/edit/${courseId}`)

  const handleUpdate = async () => {
    if (!lectureTitle || !description) {
      toast.error('Title and description are required')
      return
    }
    setLoading(true)
    try {
      let res
      if (videoMode === 'file' && videoFile) {
        const form = new FormData();
        form.append('lectureTitle', lectureTitle);
        form.append('lectureDescription', description);
        form.append('videoUrl', videoFile);
        form.append('isPreviewFree', isPreviewFree);
        res = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, form, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        const payload = { lectureTitle, lectureDescription: description, isPreviewFree };
        if (videoMode === 'link' && videoLink) payload.videoUrl = videoLink;
        res = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, payload, { withCredentials: true })
      }
      const updated = res?.data?.lecture || res?.data
      // optimistically update local state to show changes immediately
      setLectureTitle(lectureTitle)
      setDescription(description)
      setVideoLink(videoMode === 'link' ? videoLink : '')
      setIsPreviewFree(isPreviewFree)

      // refresh list from server to ensure canonical data in redux
      try {
        const fresh = await axios.get(serverUrl + `/api/course/getlecture/${courseId}`, { withCredentials: true })
        const lectures = fresh?.data?.lectures || [];
        dispatch(setlectureData(lectures))
      } catch (err) {
        // fallback to replacing single item if fetch fails
        const updatedList = (lectureData || []).map(l => l._id === lectureId ? (updated || l) : l)
        dispatch(setlectureData(updatedList))
      }
      initializedRef.current = true
      toast.success('Lecture updated')
    } catch (err) {
      console.error('update lecture', err)
      toast.error('Failed to update lecture')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    if (!confirm('Remove this lecture?')) return
    setRemoving(true)
    try {
      await axios.delete(serverUrl + `/api/course/removelecture/${courseId}/${lectureId}`, { withCredentials: true })
      const remaining = (lectureData || []).filter(l => l._id !== lectureId)
      dispatch(setlectureData(remaining))
      toast.success('Lecture removed')
      navigate(`/instructor/createlecture/${courseId}`)
    } catch (err) {
      console.error('remove lecture', err)
      toast.error('Failed to remove lecture')
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>
      <div className='backdrop-blur-md shadow-xl rounded-xl w-full max-w-2xl p-6 relative z-20 border border-white/20 bg-white/5'>
        <div className='flex items-center gap-2 mb-4'>
          <FaArrowLeft className='w-4 h-4 text-white/80 cursor-pointer' onClick={handleBack} />
          <h2 className='text-xl font-semibold text-white'>Update Lecture</h2>
        </div>

        <input value={lectureTitle ?? ''} onChange={(e)=>setLectureTitle(e.target.value)} type='text' placeholder='Lecture title' className='w-full border border-white/10 rounded-md p-3 text-sm bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/10 mb-4' />
        <textarea value={description ?? ''} onChange={(e)=>setDescription(e.target.value)} rows={4} placeholder='Short description' className='w-full border border-white/10 rounded-md p-3 text-sm bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/10 mb-4' />

        <label className='block text-sm text-white/90 mb-2'>Video (optional)</label>
        <div className='flex items-center gap-4 mb-3'>
          <label className={`px-3 py-1 rounded-md cursor-pointer text-sm ${videoMode==='file' ? 'bg-white/10 text-white border border-white/20' : 'text-white/70'}`}>
            <input type='radio' name='videoMode' checked={videoMode==='file'} onChange={()=>setVideoMode('file')} className='hidden' /> Upload file
          </label>
          <label className={`px-3 py-1 rounded-md cursor-pointer text-sm ${videoMode==='link' ? 'bg-white/10 text-white border border-white/20' : 'text-white/70'}`}>
            <input type='radio' name='videoMode' checked={videoMode==='link'} onChange={()=>setVideoMode('link')} className='hidden' /> Use link
          </label>
        </div>

        {videoMode === 'file' ? (
          <div className='flex items-center gap-3 mb-4'>
  <input 
    ref={fileRef} 
    id='video' 
    onChange={(e) => {
      const file = e.target.files?.[0];
      setVideoFile(file || null);
    }} 
    accept='video/*' 
    type='file' 
    className='hidden' 
  />
  <button 
    type='button' 
    onClick={() => fileRef.current?.click()} 
    className='group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 text-sm'
  >
    <span className='relative z-10'>Choose Video</span>
  </button>
  <span className='text-sm text-white/80 truncate max-w-xs'>
    {videoFile?.name || videoLink || 'No video selected'}
  </span>
</div>
        ) : (
          <div className='mb-4'>
            <input value={videoLink ?? ''} onChange={(e)=>setVideoLink(e.target.value)} placeholder='https://...' className='w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10' />
          </div>
        )}

        <div className='flex items-center gap-3 mb-6'>
          <input id='isFree' type='checkbox' checked={isPreviewFree} onChange={(e)=>setIsPreviewFree(e.target.checked)} className='accent-white h-4 w-4' />
          <label htmlFor='isFree' className='text-sm text-white/90'>Is this lecture free?</label>
        </div>

        <div className='flex gap-4 mb-2'>
          <button onClick={handleBack} className='flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 text-sm font-medium'>Back</button>
          <button onClick={handleUpdate} disabled={loading} className={`group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            <span className='relative z-10'>{loading ? 'Updating...' : 'Update Lecture'}</span>
          </button>
        </div>

        <div>
          <button onClick={handleRemove} disabled={removing} className='px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition'>{removing ? 'Removing...' : 'Remove'}</button>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
