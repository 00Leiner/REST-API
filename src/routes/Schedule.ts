import express from "express";
import { 
    readAllPrograms, readOptions, deleteAllOptions, readProgram, readSched, readAllSched, createSchedule } from "../controllers/Schedule";


const router = express.Router();

router.post('/create', createSchedule)
router.get('/get/', readOptions);
router.delete('/delete/all', deleteAllOptions)
router.get('/get/:scheduleID', readAllPrograms);
router.get('/get/:scheduleID/:programID', readProgram);
router.get('/getSched/:scheduleID/:programID', readAllSched);
router.get('/getSched/:scheduleID/:programID/:schedID', readSched);

export default router;