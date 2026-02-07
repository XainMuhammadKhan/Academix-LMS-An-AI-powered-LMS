import React, { useState, useRef, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import homenew from '../../assets/homenew.png'
import { useDispatch, useSelector } from 'react-redux'
import { setlectureData } from '../../redux/lectureSlice'
// import { set } from 'mongoose'
import { toast } from 'react-toastify'
import axios from 'axios'
import { serverURL as serverUrl } from '../../App'
import {FaEdit} from 'react-icons/fa'

function CreateLecture() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const fileRef = useRef(null)
  const [videoLink, setVideoLink] = useState('')
  const [videoMode, setVideoMode] = useState('file') // 'file' or 'link'
  const [isPreviewFree, setIsPreviewFree] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const {lectureData}=useSelector(state=>state.lecture);

  const handleCreateLecture = async() => {
    setLoading(true);
    try {
      let result;
      if (videoMode === 'file' && videoFile) {
        const form = new FormData();
        form.append('lectureTitle', title);
        form.append('lectureDescription', description);
        form.append('videoUrl', videoFile);
        form.append('isPreviewFree', isPreviewFree);
        result = await axios.post(serverUrl+`/api/course/createlecture/${courseId}`, form, { withCredentials:true, headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        // send JSON, optionally with videoUrl when link mode
        const payload = { lectureTitle: title, lectureDescription: description };
        if (videoMode === 'link' && videoLink) payload.videoUrl = videoLink;
        payload.isPreviewFree = isPreviewFree;
        result = await axios.post(serverUrl+`/api/course/createlecture/${courseId}`, payload, { withCredentials:true });
      }
      console.log("Lecture created:", result.data);
      dispatch(setlectureData([...(lectureData || []), result.data.lecture]));
      setLoading(false);
      toast.success("Lecture created successfully");
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setVideoLink('');
      setIsPreviewFree(false);
      if (fileRef.current) fileRef.current.value = '';
    } catch (error) {
        console.log("Error creating lecture:", error);
        setLoading(false);
        toast.error("Failed to create lecture");
    }
  }

  useEffect(() => {
    const getCourseLectures = async () => {
        try {
        const result = await axios.get(serverUrl + `/api/course/getlecture/${courseId}`, { withCredentials: true });
        const lectures = result?.data?.lectures || [];
        console.log('Course lectures fetched:', lectures);
        // save to redux so UI can render
        dispatch(setlectureData(lectures));
        } catch (error) {
            console.error('getCourseLectures error', error);
        }
    }
    getCourseLectures();
  }, [courseId]);


  const handleBack = () => navigate(`/instructor/edit/${courseId}`)
  

  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className='absolute inset-0 bg-black/10'></div>
      <div className='backdrop-blur-md shadow-xl rounded-xl w-full max-w-2xl p-6 relative z-20 border border-white/20 bg-white/5'>
        <div className="mb-6">
          <h1 className='text-2xl font-semibold text-white mb-1'>Let's Create a New Lecture</h1>
          <p className="text-sm text-white/80">Enter the title and add your video lecture to enhance your course content.</p>
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='w-full border border-white/10 rounded-md p-3 text-sm bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/10 mb-4' placeholder='e.g. Introduction to AI with Python'/>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full border border-white/10 rounded-md p-3 text-sm bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/10 mb-4' placeholder='Short description for the lecture' rows={4} />
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
            <input ref={fileRef} id='video' onChange={(e)=>setVideoFile(e.target.files?.[0]||null)} accept='video/*' type='file' className='hidden' />
            <button type='button' onClick={() => fileRef.current?.click()} className='group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 text-sm'>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
              <span className='relative z-10'>Choose Video</span>
            </button>
            <span className='text-sm text-white/80 truncate max-w-xs'>{videoFile?.name}</span>
          </div>
        ) : (
          <div className='mb-4'>
            <input value={videoLink} onChange={(e)=>setVideoLink(e.target.value)} placeholder='https://...' className='w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10' />
          </div>
        )}

        <div className='flex items-center gap-3 mb-6'>
          <input id='isFree' type='checkbox' checked={isPreviewFree} onChange={(e)=>setIsPreviewFree(e.target.checked)} className='accent-white h-4 w-4' />
          <label htmlFor='isFree' className='text-sm text-white/90'>Is this lecture free?</label>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={handleBack} className='flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 text-sm font-medium'>
            <FaArrowLeft className='w-4 h-4' />
            Back
          </button>

          <button onClick={handleCreateLecture} disabled={loading} className={`group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className='relative z-10'>{loading ? 'Creating...' : '+ Create Lecture'}</span>
          </button>
        </div>
        <div className="space-y-2">
          {(!lectureData || lectureData.length === 0) && (
            <div className="text-sm text-white/80">No lectures yet. Create the first lecture.</div>
          )}
          {lectureData?.map((lecture,index)=>(
            <div key={lecture._id || index} className="bg-white/5 rounded-md flex justify-between items-center p-3 text-sm font-medium text-white border border-white/10 hover:bg-white/6">
              <span className='truncate'>Lecture - {index+1}: {lecture.lectureTitle}</span>
              <FaEdit className='text-white/60 hover:text-white cursor-pointer ml-3' onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateLecture
