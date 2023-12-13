"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teachers = __importStar(require("../controllers/Teachers"));
const router = express_1.default.Router();
router.post('/create', Teachers.createTeacher);
router.get('/get/:teacherID', Teachers.readTeacher);
router.get('/get/', Teachers.readAllTeachers);
router.put('/update/:teacherID', Teachers.updateTeacher);
router.delete('/delete/:teacherID', Teachers.deleteTeacher);
router.put('/update/student/:teacherID/course/:courseID', Teachers.updateCourse);
router.delete('/delete/student/:teacherID/course/:courseID', Teachers.deleteCourse);
router.post('/add/course/:teacherID', Teachers.addCourse);
router.get('/get/student/:teacherID/courses', Teachers.readAllCourse);
router.get('/get/student/:teacherID/course/:courseCode', Teachers.readCourse);
exports.default = router;
