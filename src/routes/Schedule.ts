import express from "express";
import { createSched, readSched, readAllSchedule, updateSched, deleteSched, addScheduleItem, updateScheduleItem, deleteScheduleItem } from "../controllers/Schedule";


const router = express.Router();

router.post('/create', createSched);
router.get('/get/:scheduleID', readSched);
router.get('/get/', readAllSchedule);
router.put('/update/:scheduleID', updateSched);
router.delete('/delete/:scheduleID', deleteSched);
router.put('/update/student/:scheduleID/Schedule/:scheduleIDToUpdate', updateScheduleItem);
router.delete('/delete/student/:scheduleID/Schedule/:scheduleIDToDelete', deleteScheduleItem);
router.post('/add/schedule/:scheduleID', addScheduleItem);

export default router;