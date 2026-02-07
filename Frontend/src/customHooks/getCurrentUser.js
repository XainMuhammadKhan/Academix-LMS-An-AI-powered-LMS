import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverURL } from '../App'

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Try to fetch current user from server first (ensures freshest data).
    // If fetch fails (network or auth), fall back to localStorage so app can still show cached session.
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(serverURL + '/api/user/getcurrentuser', { withCredentials: true });
        const user = result?.data?.user ?? null;
        console.debug('getCurrentUser: fetched user from server', user);
        dispatch(setUserData(user));
        try { localStorage.setItem('userData', JSON.stringify(user)); } catch (e) {}
        return;
      } catch (error) {
        console.warn('getCurrentUser: failed to fetch from server, will try localStorage fallback', error?.message || error);
        // if auth error, clear locally stored user
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          dispatch(setUserData(null));
          try { localStorage.removeItem('userData'); } catch (e) {}
          return;
        }
      }

      // Fallback: restore user from localStorage if fetch failed but we have cached data
      try {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          console.debug('getCurrentUser: using localStorage cached user', parsed);
          dispatch(setUserData(parsed));
        }
      } catch (e) {
        console.warn('getCurrentUser: Failed to restore user from localStorage', e);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);
};

export default getCurrentUser
