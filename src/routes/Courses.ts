import express from "express";
import { createCourse, readCourse, readAllCourses, updateCourse, deleteCourse } from "../controllers/Courses";


const router = express.Router();

router.post('/create', createCourse);
router.get('/get/:studentID', readCourse);
router.get('/get/', readAllCourses);
router.patch('/update/:studentID', updateCourse);
router.delete('/delete/:studentID', deleteCourse);

export default router;