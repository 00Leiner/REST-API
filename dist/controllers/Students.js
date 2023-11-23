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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.addCourseToStudent = exports.deleteStudent = exports.updateStudent = exports.readAllStudents = exports.readStudent = exports.createStudent = void 0;
const Students_1 = __importDefault(require("../models/Students"));
const mongoose_1 = __importStar(require("mongoose"));
function createStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { program, year, semester, block, courses } = req.body;
            const student = new Students_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                program,
                year,
                semester,
                block,
                courses,
            });
            const savedStudent = yield student.save();
            res.status(201).json({ student: savedStudent });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createStudent = createStudent;
function readStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            const student = yield Students_1.default.findById(studentID).select('-__v');
            student
                ? res.status(200).json({ student })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readStudent = readStudent;
function readAllStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const students = yield Students_1.default.find().select('-__v');
            res.status(200).json({ students });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllStudents = readAllStudents;
;
function updateStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            console.log('Student ID:', studentID);
            const student = yield Students_1.default.findById(studentID);
            if (student) {
                student.set(req.body);
                const updatedStudent = yield student.save();
                return res.status(200).json({ students: updatedStudent });
            }
            else {
                return res.status(404).json({ message: "Not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.updateStudent = updateStudent;
;
function deleteStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            const result = yield Students_1.default.findByIdAndDelete(studentID);
            return result
                ? res.status(204).send()
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.deleteStudent = deleteStudent;
;
function addCourseToStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            const { code, description, units, labOrLec } = req.body;
            const newCourse = {
                _id: new mongoose_1.Types.ObjectId(),
                code,
                description,
                units,
                labOrLec
            };
            const updatedStudent = yield Students_1.default.findByIdAndUpdate(studentID, { $push: { courses: newCourse } }, { new: true });
            if (updatedStudent) {
                res.status(200).json({ student: updatedStudent });
            }
            else {
                res.status(404).json({ message: 'Student not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.addCourseToStudent = addCourseToStudent;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            const courseIDToUpdate = req.params.courseIDToUpdate;
            const updatedCourseData = req.body;
            const updatedStudent = yield Students_1.default.findOneAndUpdate({ _id: studentID, 'courses._id': courseIDToUpdate }, {
                $set: {
                    'courses.$.code': updatedCourseData.code,
                    'courses.$.description': updatedCourseData.description,
                    'courses.$.units': updatedCourseData.units,
                    'courses.$.labOrLec': updatedCourseData.labOrLec,
                },
            }, { new: true });
            if (updatedStudent) {
                res.status(200).json({ student: updatedStudent });
            }
            else {
                res.status(404).json({ message: 'Student or course not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.updateCourse = updateCourse;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentID = req.params.studentID;
            const courseIDToDelete = req.params.courseIDToDelete;
            const updatedStudent = yield Students_1.default.findByIdAndUpdate(studentID, {
                $pull: { courses: { _id: new mongoose_1.Types.ObjectId(courseIDToDelete) } },
            }, { new: true });
            if (updatedStudent) {
                res.status(200).json({ student: updatedStudent });
            }
            else {
                res.status(404).json({ message: 'Student not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.deleteCourse = deleteCourse;
