import express from "express";
import { createSched, readSched, readAllSchedule, updateSched, deleteSched, addScheduleItem, updateScheduleItem, deleteScheduleItem } from "../controllers/Schedule";


const router = express.Router();

router.post('/create', createSched);
router.get('/get/:scheduleID', readSched);
router.get('/get/', readAllSchedule);
router.put('/update/:scheduleID', updateSched);
router.delete('/delete/:scheduleID', deleteSched);
router.put('/update/:scheduleID/:scheduleIDToUpdate', updateScheduleItem);
router.delete('/delete/:scheduleID/:scheduleIDToDelete', deleteScheduleItem);
router.post('/add/schedule/:scheduleID', addScheduleItem);

export default router;