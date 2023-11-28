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
exports.deleteTeacher = exports.updateTeacher = exports.readAllTeachers = exports.readTeacher = exports.createTeacher = void 0;
const Teachers_1 = __importDefault(require("../models/Teachers"));
const mongoose_1 = __importDefault(require("mongoose"));
function createTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, specialized, preferred } = req.body;
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
