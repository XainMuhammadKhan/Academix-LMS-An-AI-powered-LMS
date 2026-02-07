import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import landingBg from "../assets/landing.png"
import logo from "../assets/logo.png"
import axios from "axios"
import { serverURL } from "../App"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"

const ForgetPassword = () => {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Step 1: Send OTP
    const sendOtp = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("Please enter your email")
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(`${serverURL}/api/auth/sendotp`, { email }, { withCredentials: true })
            toast.success(res.data.message)
            setStep(2)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP")
        } finally {
            setLoading(false)
        }
    }

    // Step 2: Verify OTP
    const verifyOtp = async (e) => {
        e.preventDefault()
        if (!otp) {
            toast.error("Please enter OTP")
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(`${serverURL}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
            toast.success(res.data.message)
            setStep(3)
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP")
        } finally {
            setLoading(false)
        }
    }

    // Step 3: Reset Password
    const resetPassword = async (e) => {
        e.preventDefault()
        if (!password || !confirmPassword) {
            toast.error("Please fill all fields")
            return
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters")
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(`${serverURL}/api/auth/resetpassword`, { email, otp, password }, { withCredentials: true })
            toast.success(res.data.message)
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password")
        } finally {
            setLoading(false)
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
                <div className="flex justify-center mb-3">
                    <img src={logo} alt="Logo" className="w-40 h-40 object-contain drop-shadow-2xl" />
                </div>

                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10">
                    
                    {/* Step 1: Send OTP */}
                    {step === 1 && (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="font-bold text-white text-3xl mb-2 drop-shadow-lg">Forgot Password?</h1>
                                <h2 className="text-gray-200 text-lg">Enter your email to receive OTP</h2>
                            </div>

                            <form onSubmit={sendOtp}>
                                <div className="mb-6">
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

                                <button 
                                    type="submit"
                                    className="w-full h-12 bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                                    disabled={loading}
                                >
                                    {loading ? <ClipLoader size={30} color="black" /> : "Send OTP"}
                                </button>
                            </form>

                            <div className="text-center mt-6 pt-6 border-t border-white/20">
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-white font-semibold hover:underline"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </>
                    )}

                    {/* Step 2: Verify OTP */}
                    {step === 2 && (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="font-bold text-white text-3xl mb-2 drop-shadow-lg">Enter OTP</h1>
                                <h2 className="text-gray-200 text-sm">We sent a 4-digit code to {email}</h2>
                            </div>

                            <form onSubmit={verifyOtp}>
                                <div className="mb-6">
                                    <label htmlFor="otp" className="block font-semibold text-white mb-2">
                                        OTP Code
                                    </label>
                                    <input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={4}
                                        className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-center tracking-widest text-2xl"
                                        placeholder="* * * *"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full h-12 bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                                    disabled={loading}
                                >
                                    {loading ? <ClipLoader size={30} color="black" /> : "Verify OTP"}
                                </button>
                            </form>

                            <div className="text-center mt-6 pt-6 border-t border-white/20">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-white font-semibold hover:underline"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </>
                    )}

                    {/* Step 3: Reset Password */}
                    {step === 3 && (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="font-bold text-white text-3xl mb-2 drop-shadow-lg">Reset Password</h1>
                                <h2 className="text-gray-200 text-lg">Enter your new password</h2>
                            </div>

                            <form onSubmit={resetPassword}>
                                <div className="mb-5">
                                    <label htmlFor="password" className="block font-semibold text-white mb-2">
                                        New Password
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="confirmPassword" className="block font-semibold text-white mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="bg-white/20 backdrop-blur-md border border-white/30 w-full h-12 text-white placeholder-gray-300 text-base px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full h-12 bg-white text-black font-semibold cursor-pointer flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                                    disabled={loading}
                                >
                                    {loading ? <ClipLoader size={30} color="black" /> : "Reset Password"}
                                </button>
                            </form>

                            <div className="text-center mt-6 pt-6 border-t border-white/20">
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-white font-semibold hover:underline"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
