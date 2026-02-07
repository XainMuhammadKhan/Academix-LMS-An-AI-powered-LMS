import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import landingBg from "../assets/landing.png";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { serverURL } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState('student');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(serverURL+"/api/auth/register", { name, email, password, role }, { withCredentials: true });
      
      // If backend returns a token, set Authorization header for future requests
      if (res?.data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      }

      // Persist minimal user/session info to restore UI state across reloads
      if (res?.data?.user) {
        dispatch(setUserData(res.data.user));
        try { localStorage.setItem("user", JSON.stringify(res.data.user)); } catch (e) { /* ignore */ }
        try { localStorage.setItem("isLoggedIn", "true"); } catch (e) { /* ignore */ }
      }

  // Replace history entry so back button won't return to the register page
  navigate('/home', { replace: true });
      toast.success("Registered Successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Registration Failed!." + (error?.response?.data?.message || error.message));
    }
  }
  const googleRegister = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const res = await axios.post(
        serverURL + "/api/auth/google",
        { name, email, role },
        { withCredentials: true }
      );

      // If backend returns a token, set Authorization header for future requests
      if (res?.data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      }

      if (res?.data?.user) {
        dispatch(setUserData(res.data.user));
        try {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (e) { /* ignore */ }
        try {
          localStorage.setItem("isLoggedIn", "true");
        } catch (e) { /* ignore */ }
      }

      // Replace history entry so back button won't return to the register page
      navigate('/home', { replace: true });
      toast.success("Registered Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Glass Morphism Form Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center -mb-10">
          <img src={logo} alt="Logo" className="w-40 h-40 object-contain drop-shadow-2xl" />
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-white text-3xl mb-2">Let's Get Started!</h1>
            <h2 className="text-gray-200 text-lg">Create your account</h2>
          </div>

          <form onSubmit={handleRegister}>
              {/* Name Field */}
              <div className="mb-5">
                <label htmlFor="name" className="block font-semibold text-white mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Your Name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label htmlFor="email" className="block font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label htmlFor="password" className="block font-semibold text-white mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <IoIosEyeOff size={20} />
                    ) : (
                      <IoIosEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block font-semibold text-white mb-3">
                  {role === 'Instructor' ? 'I am an' : 'I am a'}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex-1 h-12 rounded-xl font-semibold cursor-pointer transition-all ${
                      role === 'student' 
                        ? 'bg-white text-black shadow-lg' 
                        : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    STUDENT
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Instructor')}
                    className={`flex-1 h-12 rounded-xl font-semibold cursor-pointer transition-all ${
                      role === 'Instructor' 
                        ? 'bg-white text-black shadow-lg' 
                        : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    Instructor
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button 
                type="submit"
                className="w-full h-12 bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="black" /> : "Register"}
              </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="text-sm text-gray-200">Or Continue</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={() => { googleRegister(); }}
            className="w-full h-12 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all"
          >
            <img src={google} alt="google" className="w-6 h-6 mr-3" />
            <span className="text-base text-white font-medium">Continue with Google</span>
          </button>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-200">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-white font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;