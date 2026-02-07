import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import homenew from '../assets/homenew.png'
import axios from 'axios'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)

  const [form, setForm] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    description: userData?.description || '',
    photoUrl: userData?.photoUrl || '',
  })

  // Keep original File for upload and use object URL for preview
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(userData?.photoUrl || '')

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    // keep File for upload
    setSelectedFile(file)
    // preview using object URL (fast, not base64)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    // also store a copy in form.photoUrl so other logic still works if needed
    setForm(prev => ({ ...prev, photoUrl: url }))
  }

  // revoke object URL when file changes/unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)

      // If a File was selected, append it directly. This is more reliable for multer.
      if (selectedFile) {
        formData.append('photoUrl', selectedFile)
      } else if (form.photoUrl && form.photoUrl.startsWith('data:')) {
        // fallback: convert data URL to blob
        const res = await fetch(form.photoUrl)
        const blob = await res.blob()
        formData.append('photoUrl', blob, 'photo.png')
      }

      const resp = await axios.post(`${serverURL}/api/user/uploadprofile`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const updatedUser = resp?.data?.user
      if (updatedUser) {
        dispatch(setUserData(updatedUser))
        toast.success('Profile updated successfully')
      } else {
        // fallback: update local state
        dispatch(setUserData({ ...userData, ...form }))
        toast.success('Profile saved locally (server not updated)')
      }
      navigate('/profile')
    } catch (err) {
      console.error('Failed to save profile', err)
      // fallback to local update so UX isn't blocked
      dispatch(setUserData({ ...userData, ...form }))
      toast.error('Error editing profile')
      navigate('/profile')
    }
  }

  return (
    <div className='min-h-screen relative bg-cover bg-center px-4 py-10 flex items-center justify-center' style={{ backgroundImage: `url(${homenew})` }}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className=' backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-xl w-full relative z-20 border border-white/20'>
        <h2 className='text-2xl font-bold text-white mb-4'>Edit Profile</h2>
        <div className='flex flex-col items-center mb-4'>
          <div className='w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 bg-black flex items-center justify-center'>
            {form.photoUrl || userData?.photoUrl ? (
              <img src={form.photoUrl || userData?.photoUrl} alt="profile preview" className='w-full h-full object-cover'/>
            ) : (
              <span className='text-white text-3xl font-bold'>{(form.name || userData?.name || ' ').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <label htmlFor='profile-photo' className='mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md border border-white/20 hover:bg-white/20 cursor-pointer select-none'>
            Choose or take a picture
          </label>
          <input
            id='profile-photo'
            type='file'
            accept='image/*'
            capture='environment'
            onChange={handleFileChange}
            className='hidden'
          />
        </div>
        <form onSubmit={handleSave} className='space-y-4'>
          <div>
            <label className='block text-white/90 text-sm mb-1'>Name</label>
            <input name='name' value={form.name} onChange={handleChange} className='w-full p-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>
          <div>
            <label className='block text-white/90 text-sm mb-1'>Email</label>
            <input name='email' value={form.email} onChange={handleChange} className='w-full p-2 rounded-md bg-white/10 text-white border border-white/20' />
          </div>
          <div>
            <label className='block text-white/90 text-sm mb-1'>Bio</label>
            <textarea name='description' value={form.description} onChange={handleChange} className='w-full p-2 rounded-md bg-white/10 text-white border border-white/20' rows={4} />
          </div>
          {/* Photo is chosen above via file input; preview shows selected image */}

          <div className='flex gap-4 justify-center'>
            <button type='submit' className='group relative overflow-hidden px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg border border-gray-700'>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
              <span className='relative z-10'>Save</span>
            </button>
            <button type='button' onClick={() => navigate('/profile')}
              className='px-6 py-2 bg-white/10 text-white rounded-lg border border-white/20 transition-transform duration-200 hover:scale-105 cursor-pointer'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
