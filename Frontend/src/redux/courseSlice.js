import {createSlice} from '@reduxjs/toolkit';
import { setUserData } from './userSlice';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
    creatorCourseData: [],
    courseData: [],
    selectedCourse: null,
    },
    reducers:{
        setCreatorCourseData:(state, action) => {
            state.creatorCourseData = action.payload;
            try {
                if (action.payload) localStorage.setItem("creatorCourseData", JSON.stringify(action.payload));
                else localStorage.removeItem("creatorCourseData");
            } catch (e) {
                console.log(e);
            }
        }
        ,
        setCourseData: (state, action) => {
            state.courseData = action.payload;
            try {
                if (action.payload) localStorage.setItem("courseData", JSON.stringify(action.payload));
                else localStorage.removeItem("courseData");
            } catch (e) {
                console.log(e);
            }
        },
        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload;
            try {
                if (action.payload) localStorage.setItem("selectedCourse", JSON.stringify(action.payload));
                else localStorage.removeItem("selectedCourse");
            } catch (e) {
                console.log(e);
            }
        }
    }
});
export const { setCreatorCourseData, setCourseData, setSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;