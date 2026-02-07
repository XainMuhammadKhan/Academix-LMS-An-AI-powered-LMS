import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'
import { serverURL } from '../App'

const getPublishedCourse = () => {
    const dispatch = useDispatch()
  useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(serverURL + '/api/course/getpublished', { withCredentials: true })
                const payload = result?.data?.courses || []
                dispatch(setCourseData(payload))
                console.log('getPublishedCourse response', payload)
            } catch (error) {
                console.error('getPublishedCourse error', error)
            }
        }
        getCourseData()
    }, [])
}

export default getPublishedCourse
