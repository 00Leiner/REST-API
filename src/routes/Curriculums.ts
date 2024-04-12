import express from "express";
import * as Curriculums from "../controllers/Curriculums";


const router = express.Router();

router.post('/create', Curriculums.createCurriculum);
router.get('/get/:curriculumID', Curriculums.readCurriculum);
router.get('/get/', Curriculums.readAllCurriculums);
router.put('/update/:curriculumID', Curriculums.updateCurriculum);
router.delete('/delete/:curriculumID', Curriculums.deleteCurriculum);
router.put('/update/curriculum/:curriculumID/course/:courseID', Curriculums.updateCourse);
router.delete('/delete/curriculum/:curriculumID/course/:courseID', Curriculums.deleteCourse);
router.post('/add/course/:curriculumID', Curriculums.addCourse);
router.get('/get/curriculum/:curriculumID/courses', Curriculums.readAllCourse);
router.get('/get/curriculum/:curriculumID/course/:courseCode', Curriculums.readCourse);

export default router;