"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teachers_1 = require("../controllers/Teachers");
const router = express_1.default.Router();
router.post('/create', Teachers_1.createTeacher);
router.get('/get/:teacherID', Teachers_1.readTeacher);
router.get('/get/', Teachers_1.readAllTeachers);
router.put('/update/:teacherID', Teachers_1.updateTeacher);
router.delete('/delete/:teacherID', Teachers_1.deleteTeacher);
exports.default = router;
