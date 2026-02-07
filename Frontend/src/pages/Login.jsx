import React from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import landingBg from "../assets/landing.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";


// Ensure axios sends cookies (httpOnly session cookie) when calling the API
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
  const res = await axios.post(serverURL + "/api/auth/login", { email, password }, { withCredentials: true });
  
      // If backend returns a token, set it on axios default headers so subsequent requests include it
      if (res?.data?.token) {
        // avoid storing the token in localStorage unless you explicitly want that; we'll set the header
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      }

      // Persist minimal user/session info so the app can restore UI state across browser restarts
      if (res?.data?.user) {
        dispatch(setUserData(res.data.user));
        try { localStorage.setItem("user", JSON.stringify(res.data.user)); } catch (e) { /* ignore */ }
        try { localStorage.setItem("isLoggedIn", "true"); } catch (e) { /* ignore */ }
      }

  // Replace the history entry so the browser back button won't return to the login page
  navigate("/home", { replace: true });
	toast.success("Logged in Successfully!");
	setLoading(false);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error("Login Failed! " + msg);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const res = await axios.post(serverURL + "/api/auth/google", { name, email }, { withCredentials: true });

      if (res?.data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      }

      if (res?.data?.user) {
        dispatch(setUserData(res.data.user));
        try { localStorage.setItem("user", JSON.stringify(res.data.user)); } catch (e) { /* ignore */ }
        try { localStorage.setItem("isLoggedIn", "true"); } catch (e) { /* ignore */ }
      }

      navigate("/home", { replace: true });
      toast.success("Logged in Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-bold text-white text-3xl mb-2 drop-shadow-lg">Welcome back</h1>
              <h2 className="text-gray-200 text-lg">Sign in to your account</h2>
            </div>

            <form onSubmit={handleLogin}>
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
                  className="bg-white/20 backdrop-blur-sm border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="block font-semibold text-white mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder="Your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <IoIosEyeOff size={20} />
                    ) : (
                      <IoIosEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">
                <button 
                  type="button" 
                  onClick={() => navigate('/forgot')}
                  className="text-sm text-gray-200 hover:text-white transition-colors hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-gray-200 transition-all shadow-lg"
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="black" /> : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-sm text-gray-200">Or Continue</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Google Login */}
            <button 
              type="button" 
              onClick={googleLogin}
              className="w-full h-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer flex items-center justify-center rounded-xl hover:bg-white/20 transition-all"
            >
              <img src={google} alt="google" className="w-6 h-6 mr-3" />
              <span className="text-base text-white font-medium">Continue with Google</span>
            </button>

            {/* Register Link */}
            <div className="text-center mt-8 pt-6 border-t border-white/20">
              <p className="text-gray-200">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-white font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;