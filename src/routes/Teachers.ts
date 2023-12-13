import express from "express";
import * as Teachers from "../controllers/Teachers";


const router = express.Router();

router.post('/create', Teachers.createTeacher);
router.get('/get/:teacherID', Teachers.readTeacher);
router.get('/get/', Teachers.readAllTeachers);
router.put('/update/:teacherID', Teachers.updateTeacher);
router.delete('/delete/:teacherID', Teachers.deleteTeacher);
router.put('/update/teacher/:teacherID/course/:courseID', Teachers.updateCourse);
router.delete('/delete/teacher/:teacherID/course/:courseID', Teachers.deleteCourse);
router.post('/add/course/:teacherID', Teachers.addCourse);
router.get('/get/teacher/:teacherID/courses', Teachers.readAllCourse);
router.get('/get/teacher/:teacherID/course/:courseCode', Teachers.readCourse)

export default router;