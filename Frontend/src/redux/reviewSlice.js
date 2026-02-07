import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: {}, // key: courseId, value: array of reviews for that course
    loading: false,
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      const { courseId, reviews } = action.payload;
      state.reviews[courseId] = reviews;
      try {
        localStorage.setItem('reviewCache', JSON.stringify(state.reviews));
      } catch (e) {
        console.log('localStorage error for reviews:', e);
      }
    },
    addReview: (state, action) => {
      const { courseId, review } = action.payload;
      if (!state.reviews[courseId]) {
        state.reviews[courseId] = [];
      }
      // Prepend new review
      state.reviews[courseId] = [review, ...state.reviews[courseId]];
      try {
        localStorage.setItem('reviewCache', JSON.stringify(state.reviews));
      } catch (e) {
        console.log('localStorage error for reviews:', e);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCourseReviews: (state, action) => {
      const { courseId } = action.payload;
      delete state.reviews[courseId];
      try {
        localStorage.setItem('reviewCache', JSON.stringify(state.reviews));
      } catch (e) {
        console.log('localStorage error for reviews:', e);
      }
    },
  },
});

export const { setReviews, addReview, setLoading, setError, clearCourseReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
