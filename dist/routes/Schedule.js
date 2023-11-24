"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Schedule_1 = require("../controllers/Schedule");
const router = express_1.default.Router();
router.post('/create', Schedule_1.createSched);
router.get('/get/:scheduleID', Schedule_1.readSched);
router.get('/get/', Schedule_1.readAllSchedule);
router.put('/update/:scheduleID', Schedule_1.updateSched);
router.delete('/delete/:scheduleID', Schedule_1.deleteSched);
router.put('/update/student/:scheduleID/Schedule/:scheduleIDToUpdate', Schedule_1.updateScheduleItem);
router.delete('/delete/student/:scheduleID/Schedule/:scheduleIDToDelete', Schedule_1.deleteScheduleItem);
router.post('/add/schedule/:scheduleID', Schedule_1.addScheduleItem);
exports.default = router;
