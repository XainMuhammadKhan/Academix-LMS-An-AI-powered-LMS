import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isClosingDropdown, setIsClosingDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Logout request failed", err?.message || err);
    } finally {
      // Clear client-side state
      try {
        localStorage.removeItem("user");
      } catch (e) {}
      try {
        localStorage.removeItem("isLoggedIn");
      } catch (e) {}
      try {
        delete axios.defaults.headers.common["Authorization"];
      } catch (e) {}
      dispatch(setUserData(null));
      toast.info("Logged out");
      navigate("/login", { replace: true });
      closeMenu();
      closeDropdown();
    }
  };

  const handleLogin = () => {
    navigate("/login");
    closeMenu();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    closeMenu();
    closeDropdown();
  };

  const handleProfile = () => {
    navigate("/profile");
    closeDropdown();
  };

  const handleMyCourses = () => {
    navigate("/my-courses");
    closeDropdown();
  };

  const closeMenu = () => {
    setIsClosingMenu(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosingMenu(false);
    }, 300);
  };

  const closeDropdown = () => {
    setIsClosingDropdown(true);
    setTimeout(() => {
      setShowDropdown(false);
      setIsClosingDropdown(false);
    }, 200);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      closeDropdown();
    } else {
      setShowDropdown(true);
    }
  };

  return (
    <div className="w-full h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-black/50 backdrop-blur-sm z-50">
      <div className="lg:w-[20%] w-[40%] lg:pl-4">
        <img src={Logo} alt="logo" className="w-28 h-28 object-contain" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-end gap-3 lg:gap-4 relative">
        {/* User Avatar - show profile picture or initial */}
        <div className="relative">
          {userData ? (
            <div onClick={toggleDropdown} className="cursor-pointer">
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-white shrink-0"
                />
              ) : (
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg lg:text-xl shrink-0">
                  {userData.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          ) : (
            <IoPersonCircle className="w-10 h-10 lg:w-12 lg:h-12 fill-white cursor-pointer shrink-0" />
          )}

          {/* Desktop Dropdown Menu */}
          {showDropdown && userData && (
            <div
              className={`absolute top-[120%] right-0 w-48 bg-black/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-4 flex flex-col gap-2 z-50 
                            ${
                              isClosingDropdown
                                ? "animate-[dropdownSlideOut_0.2s_ease-in_forwards]"
                                : "animate-[dropdownSlide_0.2s_ease-out]"
                            }`}
            >
              {/* User Info */}
              <div className="pb-3 border-b border-white/20">
                <p className="text-white font-semibold text-sm">
                  {userData.name}
                </p>
                <p className="text-gray-400 text-xs">{userData.email}</p>
                <p className="text-gray-400 text-xs">{userData.role}</p>
              </div>

              {/* My Profile */}
              <button
                onClick={handleProfile}
                className="w-full px-3 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-200 text-left hover:scale-105"
              >
                My Profile
              </button>

              {/* My Courses */}
              <button
                onClick={handleMyCourses}
                className="w-full px-3 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-200 text-left hover:scale-105"
              >
                My Courses
              </button>
            </div>
          )}
        </div>

        {/* Dashboard button - only for Instructors */}
        {userData?.role === "Instructor" && (
          <button
            onClick={handleDashboard}
            className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Dashboard</span>
          </button>
        )}

        {userData ? (
          <button
            onClick={handleLogout}
            className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Logout</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-110 shadow-lg hover:shadow-2xl border border-gray-700"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Login</span>
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-white text-3xl z-50 transition-transform duration-300 hover:scale-110"
      >
        <div
          className={`transition-all duration-300 ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className={`lg:hidden absolute top-[70px] right-0 w-64 bg-black/70 backdrop-blur-sm border-l border-b border-white/20 shadow-xl rounded-bl-2xl p-6 flex flex-col gap-4 
                        ${
                          isClosingMenu
                            ? "animate-[mobileSlideOut_0.3s_ease-in_forwards]"
                            : "animate-[mobileSlide_0.3s_ease-out]"
                        }`}
        >
          {/* User Avatar in Mobile Menu */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/20">
            {userData ? (
              userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl shrink-0">
                  {userData.name?.slice(0, 1).toUpperCase()}
                </div>
              )
            ) : (
              <IoPersonCircle className="w-12 h-12 fill-white shrink-0" />
            )}
            <div className="text-white">
              <p className="font-semibold">{userData?.name || "Guest"}</p>
              <p className="font-semibold">
                {userData?.email || "Guest@guest.com"}
              </p>
              <p className="text-xs text-gray-400">
                {userData?.role || "Not logged in"}
              </p>
            </div>
          </div>

          {/* My Profile and My Courses */}
          {userData && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/profile");
                  closeMenu();
                }}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-200 text-left hover:scale-105"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/my-courses");
                  closeMenu();
                }}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-200 text-left hover:scale-105"
              >
                My Courses
              </button>
            </div>
          )}

          {/* Dashboard button - only for Instructors */}
          {userData?.role === "Instructor" && (
            <button
              onClick={handleDashboard}
              className="group relative overflow-hidden w-full px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl text-base font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm border border-gray-700 text-left"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10">Dashboard</span>
            </button>
          )}

          {/* Login/Logout Button */}
          {userData ? (
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden w-full px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl text-base font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm border border-gray-700 text-left"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10">Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="group relative overflow-hidden w-full px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl text-base font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm border border-gray-700 text-left"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full -translate-y-full rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10">Login</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
