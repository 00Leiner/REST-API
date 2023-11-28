"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Courses_1 = require("../controllers/Courses");
const router = express_1.default.Router();
router.post('/create', Courses_1.createCourse);
router.get('/get/:courseID', Courses_1.readCourse);
router.get('/get/', Courses_1.readAllCourses);
router.put('/update/:courseID', Courses_1.updateCourse);
router.delete('/delete/:courseID', Courses_1.deleteCourse);
exports.default = router;
