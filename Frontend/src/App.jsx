import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import AllCourses from './pages/AllCourses'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Instructor/Dashboard'
import Courses from './pages/Instructor/courses'
import CreateCourses from './pages/Instructor/CreateCourses'
import EditCourse from './pages/Instructor/EditCourse'
import ForgetPassword from './pages/ForgetPassword' 

export const serverURL = "http://localhost:8000";
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import useGetCreatorCourse from './customHooks/getCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import CreateLecture from './pages/Instructor/createLecture'
import EditLecture from './pages/Instructor/EditLecture'
import ViewCourse from './pages/Instructor/ViewCourse'
import ViewLecture from './pages/Instructor/ViewLecture'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'
import ScrollToTop from './components/ScrollToTop'
import RoleRoute from './components/RoleRoute'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import SearchWithAi from './pages/SearchWithAi'


function App() {
  getCurrentUser();
  useGetCreatorCourse();
  getPublishedCourse();
  const {userData} = useSelector(state => state.user);
  
  // PublicRoute prevents logged-in users from visiting auth pages (login/register)
  // Redirects authenticated users to /home
  const PublicRoute = ({ children }) => {
    const userData = useSelector((state) => state.user.userData);
    if (userData) return <Navigate to='/home' replace />;
    return children;
  };

  // ProtectedRoute ensures only authenticated users can access certain pages
  const ProtectedRoute = ({ children }) => {
    const userData = useSelector((state) => state.user.userData);
    if (!userData) return <Navigate to='/' replace />;
    return children;
  };
  
  return (
    <>
    <ToastContainer />
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/my-courses' element={<ProtectedRoute><Navigate to="/mycourses" replace /></ProtectedRoute>} />
      <Route path='/profile/edit' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path='/dashboard' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><Dashboard /></RoleRoute></ProtectedRoute>} />
      <Route path='/courses' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><Courses /></RoleRoute></ProtectedRoute>} />
      <Route path='/allcourses' element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
      <Route path='/instructor/create-course' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><CreateCourses /></RoleRoute></ProtectedRoute>} />
      <Route path='/instructor/edit/:id' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><EditCourse /></RoleRoute></ProtectedRoute>} />
      <Route path='/instructor/:courseId/createLecture' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><CreateLecture /></RoleRoute></ProtectedRoute>} />
      <Route path='/createLecture/:courseId' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><CreateLecture /></RoleRoute></ProtectedRoute>} />
      <Route path='/createlecture/:courseId' element={<ProtectedRoute><RoleRoute allowedRoles={["Instructor"]}><CreateLecture /></RoleRoute></ProtectedRoute>} />
      <Route path='/forgot' element={<PublicRoute><ForgetPassword /></PublicRoute>} />
      <Route path='/editlecture/:courseId/:lectureId' element={<ProtectedRoute><EditLecture /></ProtectedRoute>} />
      <Route path='/viewcourse/:courseId' element={<ProtectedRoute><ViewCourse /></ProtectedRoute>} />
      <Route path='/viewlecture/:courseId/:lectureId' element={<ProtectedRoute><ViewLecture /></ProtectedRoute>} />
      <Route path='/payment/success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path='/payment/failure' element={<ProtectedRoute><PaymentFailure /></ProtectedRoute>} />
      <Route path='/mycourses' element={<ProtectedRoute><MyEnrolledCourses /></ProtectedRoute>} />
      <Route path='/search' element={<ProtectedRoute><SearchWithAi /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
