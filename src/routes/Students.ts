import express from "express";
import { createStudent, readStudent, readAllStudents, updateStudent, deleteStudent, deleteCourse, updateCourse, addCourseToStudent } from "../controllers/Students";


const router = express.Router();

router.post('/create', createStudent);
router.get('/get/:studentID', readStudent);
router.get('/get/', readAllStudents);
router.put('/update/:studentID', updateStudent);
router.delete('/delete/:studentID', deleteStudent);
router.put('/update/:studentID/:courseIDToUpdate', updateCourse);
router.delete('/delete/:studentID/:courseIDToDelete', deleteCourse);
router.post('/add/course/:studentID', addCourseToStudent);

export default router;