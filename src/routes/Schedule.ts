import express from "express";
import { 
    createSched, 
    readSched, readAllSchedule, 
    updateSched, deleteSched, 
    addScheduleItem, updateScheduleItem, 
    deleteScheduleItem, readScheduleItem, 
    readAllScheduleItem, createOptions } from "../controllers/Schedule";


const router = express.Router();

router.post('/create', createOptions);
router.get('/get/:scheduleID', readSched);
router.get('/get/', readAllSchedule);
router.put('/update/:scheduleID', updateSched);
router.delete('/delete/:scheduleID', deleteSched);
router.put('/update/program/block/course/schedule/:scheduleID/course/code/:coursecode', updateScheduleItem);
router.delete('/delete/program/block/course/schedule/:scheduleID/course/code/:coursecode', deleteScheduleItem);
router.post('/add/program/block/course/schedule/:scheduleID', addScheduleItem);
router.get('/get/program/block/schedule/:scheduleID/courses/code/', readAllScheduleItem);
router.get('/get/program/block/schedule/:scheduleID/course/code/:coursecode', readScheduleItem)

export default router;