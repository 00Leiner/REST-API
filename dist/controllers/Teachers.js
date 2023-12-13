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
exports.readCourse = exports.readAllCourse = exports.deleteCourse = exports.updateCourse = exports.addCourse = exports.deleteTeacher = exports.updateTeacher = exports.readAllTeachers = exports.readTeacher = exports.createTeacher = void 0;
const Teachers_1 = __importDefault(require("../models/Teachers"));
const mongoose_1 = __importStar(require("mongoose"));
function createTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, specialized } = req.body;
            const teacher = new Teachers_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name,
                specialized
            });
            const savedTeacher = yield teacher.save();
            res.status(201).json({ teacher: savedTeacher });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createTeacher = createTeacher;
;
function readTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const teacher = yield Teachers_1.default.findById(teacherID).select('-__v');
            teacher
                ? res.status(200).json({ teacher })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readTeacher = readTeacher;
;
function readAllTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teachers = yield Teachers_1.default.find().select('-__v');
            res.status(200).json({ teachers });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllTeachers = readAllTeachers;
;
function updateTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            console.log('Teacher ID:', teacherID);
            const teacher = yield Teachers_1.default.findById(teacherID);
            if (teacher) {
                teacher.set(req.body);
                const updatedTeacher = yield teacher.save();
                return res.status(200).json({ teachers: updatedTeacher });
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
exports.updateTeacher = updateTeacher;
;
function deleteTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const result = yield Teachers_1.default.findByIdAndDelete(teacherID);
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
exports.deleteTeacher = deleteTeacher;
;
function addCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const { code, description, units, type } = req.body;
            const newCourse = {
                _id: new mongoose_1.Types.ObjectId(),
                code,
                description,
                units,
                type
            };
            const updatedTeacher = yield Teachers_1.default.findByIdAndUpdate(teacherID, { $push: { specialized: newCourse } }, { new: true });
            if (updatedTeacher) {
                res.status(200).json({ teacher: updatedTeacher });
            }
            else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.addCourse = addCourse;
;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const courseIDToUpdate = req.params.courseID;
            const updatedCourseData = req.body;
            const updatedTeacher = yield Teachers_1.default.findOneAndUpdate({ _id: teacherID, 'courses._id': courseIDToUpdate }, {
                $set: {
                    'courses.$.code': updatedCourseData.code,
                    'courses.$.description': updatedCourseData.description,
                    'courses.$.units': updatedCourseData.units,
                    'courses.$.type': updatedCourseData.type,
                },
            }, { new: true });
            if (updatedTeacher) {
                res.status(200).json({ specialized: updatedTeacher.specialized });
            }
            else {
                res.status(404).json({ message: 'Teacher or course not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.updateCourse = updateCourse;
;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const courseIDToDelete = req.params.courseID;
            const updatedTeacher = yield Teachers_1.default.findByIdAndUpdate(teacherID, {
                $pull: { courses: { _id: new mongoose_1.Types.ObjectId(courseIDToDelete) } },
            }, { new: true });
            if (updatedTeacher) {
                res.status(200).json({ specialized: updatedTeacher.specialized });
            }
            else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.deleteCourse = deleteCourse;
;
function readAllCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const teacher = yield Teachers_1.default.findById(teacherID).select('-__v');
            if (teacher) {
                res.status(200).json({ specialized: teacher.specialized });
            }
            else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.readAllCourse = readAllCourse;
;
function readCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherID = req.params.teacherID;
            const courseCode = req.params.courseCode;
            const teacher = yield Teachers_1.default.findById(teacherID);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found for the given teacherID' });
            }
            // Find the course based on the courseID
            const specialized = teacher.specialized.find((c) => c.code === courseCode);
            if (specialized) {
                return res.status(200).json({ course: specialized });
            }
            else {
                return res.status(404).json({ message: 'Course code not exist' });
            }
        }
        catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.readCourse = readCourse;
;
