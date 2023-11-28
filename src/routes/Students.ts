import express from "express";
import { createStudent, readStudent, readAllStudents, updateStudent, deleteStudent, deleteCourse, updateCourse, addCourse, readAllCourse, readCourse } from "../controllers/Students";


const router = express.Router();

router.post('/create', createStudent);
router.get('/get/:studentID', readStudent);
router.get('/get/', readAllStudents);
router.put('/update/:studentID', updateStudent);
router.delete('/delete/:studentID', deleteStudent);
router.put('/update/student/:studentID/course/:courseID', updateCourse);
router.delete('/delete/student/:studentID/course/:courseID', deleteCourse);
router.post('/add/course/:studentID', addCourse);
router.get('/get/student/:studentID/courses', readAllCourse);
router.get('/get/student/:studentID/course/:courseID', readCourse)

export default router;