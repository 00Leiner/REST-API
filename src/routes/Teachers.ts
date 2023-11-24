import express from "express";
import { createTeacher, readTeacher, readAllTeachers, updateTeacher, deleteTeacher } from "../controllers/Teachers";


const router = express.Router();

router.post('/create', createTeacher);
router.get('/get/:teacherID', readTeacher);
router.get('/get/', readAllTeachers);
router.put('/update/:teacherID', updateTeacher);
router.delete('/delete/:teacherID', deleteTeacher);

export default router;