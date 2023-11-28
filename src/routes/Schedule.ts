import express from "express";
import { createSched, readSched, readAllSchedule, updateSched, deleteSched, addScheduleItem, updateScheduleItem, deleteScheduleItem, readScheduleItem, readAllScheduleItem } from "../controllers/Schedule";


const router = express.Router();

router.post('/create', createSched);
router.get('/get/:scheduleID', readSched);
router.get('/get/', readAllSchedule);
router.put('/update/:scheduleID', updateSched);
router.delete('/delete/:scheduleID', deleteSched);
router.put('/update/schedule/:scheduleID/item/:item', updateScheduleItem);
router.delete('/delete/schedule/:scheduleID/item/:item', deleteScheduleItem);
router.post('/add/schedule/item/:scheduleID', addScheduleItem);
router.get('/get/schedule/:scheduleID/item', readAllScheduleItem);
router.get('/get/schedule/:scheduleID/item/:item', readScheduleItem)

export default router;