"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Students_1 = require("../controllers/Students");
const router = express_1.default.Router();
router.post('/create', Students_1.createStudent);
router.get('/get/:studentID', Students_1.readStudent);
router.get('/get/', Students_1.readAllStudents);
router.patch('/update/:studentID', Students_1.updateStudent);
router.delete('/delete/:studentID', Students_1.deleteStudent);
router.patch('/update/student/:studentID/course/:courseIDToUpdate', Students_1.updateCourse);
router.delete('/delete/student/:studentID/course/:courseIDToDelete', Students_1.deleteCourse);
router.post('/add/course/:studentID', Students_1.addCourseToStudent);
exports.default = router;
