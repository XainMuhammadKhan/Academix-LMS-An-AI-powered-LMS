import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { serverURL } from '../App'
import { setCreatorCourseData } from '../redux/courseSlice';

// custom hook to fetch courses created by the current user
export default function useGetCreatorCourse() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  useEffect(() => {
    // always attempt to fetch creator courses (backend will 401 if not authenticated)
    const creatorCourse = async () => {
      try {
        const result = await axios.get(serverURL + '/api/course/getcreator', { withCredentials: true });
        console.log('getCreatorCourse response', result.data);
        // backend returns { courses: [...] } — normalize if needed
        const payload = result.data.courses || result.data;
        dispatch(setCreatorCourseData(payload));
      } catch (error) {
        console.error('getCreatorCourse error', error);
      }
    }

    creatorCourse();
  }, [dispatch]);
}
