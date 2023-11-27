import express from "express";
import { createCourse, readCourse, readAllCourses, updateCourse, deleteCourse } from "../controllers/Courses";


const router = express.Router();

router.post('/create', createCourse);
router.get('/get/:courseID', readCourse);
router.get('/get/', readAllCourses);
router.put('/update/:courseID', updateCourse);
router.delete('/delete/:courseID', deleteCourse);

export default router;