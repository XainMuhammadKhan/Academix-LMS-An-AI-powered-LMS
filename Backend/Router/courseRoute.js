import express from 'express';
import { createCourse, deleteCourse, getPublishedCourses, getCreatorCourses, getCoursebyId, editCourse, createLecture, removeLecture, getCreatorById, createCheckoutSession, verifyCheckoutSession, createReview } from '../Controllers/courseController.js';
import isAuthenticated from '../middleware/is_authenticated.js';
import upload from '../middleware/multer.js';
import { editLecture, getCourseLectures } from '../Controllers/courseController.js';
import { searchWithAi } from '../Controllers/searchController.js';

const courseRouter = express.Router();
// for courses
courseRouter.post('/create', isAuthenticated, createCourse);
courseRouter.get('/getpublished', isAuthenticated, getPublishedCourses);
courseRouter.get('/getcreator', isAuthenticated, getCreatorCourses);
// use the shared `upload` middleware for file uploads (thumbnail)
courseRouter.post('/editcourse/:courseId', isAuthenticated, upload.single('thumbnail'), editCourse);
courseRouter.get('/getcourse/:courseId', isAuthenticated, getCoursebyId);
courseRouter.post('/review/:courseId', isAuthenticated, createReview);
courseRouter.delete('/delete/:courseId', isAuthenticated, deleteCourse);


//for lectures
courseRouter.post("/createlecture/:courseId", isAuthenticated,upload.single('videoUrl'), createLecture);
courseRouter.delete("/removelecture/:courseId/:lectureId", isAuthenticated,removeLecture);
courseRouter.post('/editlecture/:lectureId', isAuthenticated,upload.single('videoUrl'), editLecture);
courseRouter.get('/getlecture/:courseId', isAuthenticated, getCourseLectures);
courseRouter.post('/creator',isAuthenticated,getCreatorById)
courseRouter.post('/create-checkout-session', isAuthenticated, createCheckoutSession)
courseRouter.post('/verify-session', isAuthenticated, verifyCheckoutSession)

courseRouter.post('/search',searchWithAi)
export default courseRouter;