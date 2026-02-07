import { v2 as cloudinary } from 'cloudinary'

import fs from 'fs'

const uploadToCloudinary = async (filepath) => {
    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

    try {
        if (!filepath) {
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            resource_type: 'auto',
        })
        if (fs.existsSync(filepath)) {
            try { fs.unlinkSync(filepath) } catch (e) { console.warn('Failed to unlink uploaded file', e) }
        }
        return uploadResult.secure_url
    } catch (error) {
        if (filepath && fs.existsSync(filepath)) {
            try { fs.unlinkSync(filepath) } catch (e) { console.warn('Failed to unlink after upload error', e) }
        }
        console.error('Cloudinary Upload Error:', error)
        return null
        
    }
}

export default uploadToCloudinary;