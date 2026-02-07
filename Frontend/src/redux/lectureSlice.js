import {createSlice} from '@reduxjs/toolkit';
import { setUserData } from './userSlice';

const lectureSlice = createSlice({
    name: 'lecture',
    initialState: {
    lectureData: [],
    },
    reducers:{
        setlectureData:(state, action) => {
            state.lectureData = action.payload;
            try {
                if (action.payload) localStorage.setItem("lectureData", JSON.stringify(action.payload));
                else localStorage.removeItem("lectureData");
            } catch (e) {
                console.log(e);
            }
        }
    }
});
export const { setlectureData } = lectureSlice.actions;
export default lectureSlice.reducer;