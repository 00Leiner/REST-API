import express from "express";
import { 
    readAllPrograms, readOptions, deleteAllOptions, readProgram, readSched } from "../controllers/Schedule";


const router = express.Router();

router.get('/get/:scheduleID', readAllPrograms);
router.get('/get/', readOptions);
router.delete('/delete/all', deleteAllOptions)
router.get('/get/:scheduleID/:programID', readProgram);
router.get('/get/:scheduleID/:programID/:schedID', readSched);

export default router;