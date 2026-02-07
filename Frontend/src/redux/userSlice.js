import { createSlice } from "@reduxjs/toolkit";

// Try to rehydrate userData from localStorage so refreshes keep the session
const savedUser = (() => {
  try {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: savedUser,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      try {
        if (action.payload) localStorage.setItem("userData", JSON.stringify(action.payload));
        else localStorage.removeItem("userData");
      } catch (e) {
        // ignore localStorage errors
      }
    },
    clearUser: (state) => {
      state.userData = null;
      try { localStorage.removeItem("userData"); } catch (e) {}
    }
  }
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;