"use strict";
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
exports.deleteCourse = exports.updateCourse = exports.readAllCourses = exports.readCourse = exports.createCourse = void 0;
const Courses_1 = __importDefault(require("../models/Courses"));
const mongoose_1 = __importDefault(require("mongoose"));
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, description, units, labOrLec } = req.body;
            const courses = new Courses_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                code,
                description,
                units,
                labOrLec
            });
            const savedCourse = yield courses.save();
            res.status(201).json({ courses: savedCourse });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createCourse = createCourse;
;
function readCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseID = req.params.courseID;
            const course = yield Courses_1.default.findById(courseID).select('-__v');
            course
                ? res.status(200).json({ course })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readCourse = readCourse;
function readAllCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield Courses_1.default.find().select('-__v');
            res.status(200).json({ courses });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllCourses = readAllCourses;
;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseID = req.params.courseID;
            console.log('Course ID:', courseID);
            const course = yield Courses_1.default.findById(courseID);
            if (course) {
                course.set(req.body);
                const updatedCourse = yield course.save();
                return res.status(200).json({ courses: updatedCourse });
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
exports.updateCourse = updateCourse;
;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseID = req.params.courseID;
            const result = yield Courses_1.default.findByIdAndDelete(courseID);
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
exports.deleteCourse = deleteCourse;
;
