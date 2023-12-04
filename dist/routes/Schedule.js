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
router.put('/update/program/block/course/schedule/:scheduleID/course/code/:coursecode', Schedule_1.updateScheduleItem);
router.delete('/delete/program/block/course/schedule/:scheduleID/course/code/:coursecode', Schedule_1.deleteScheduleItem);
router.post('/add/program/block/course/schedule/:scheduleID', Schedule_1.addScheduleItem);
router.get('/get/program/block/schedule/:scheduleID/courses/code/', Schedule_1.readAllScheduleItem);
router.get('/get/program/block/schedule/:scheduleID/course/code/:coursecode', Schedule_1.readScheduleItem);
exports.default = router;
