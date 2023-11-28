import express from "express";
import { createStudent, readStudent, readAllStudents, updateStudent, deleteStudent, deleteCourse, updateCourse, addCourse } from "../controllers/Students";


const router = express.Router();

router.post('/create', createStudent);
router.get('/get/:studentID', readStudent);
router.get('/get/', readAllStudents);
router.put('/update/:studentID', updateStudent);
router.delete('/delete/:studentID', deleteStudent);
router.put('/update/:studentID/:courseID', updateCourse);
router.delete('/delete/:studentID/:courseID', deleteCourse);
router.post('/add/course/:studentID', addCourse);

export default router;