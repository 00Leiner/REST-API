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
exports.deleteScheduleItem = exports.updateScheduleItem = exports.addScheduleItem = exports.deleteSched = exports.updateSched = exports.readAllSchedule = exports.readSched = exports.createSched = void 0;
const Schedule_1 = __importDefault(require("../models/Schedule"));
const mongoose_1 = __importStar(require("mongoose"));
function createSched(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { program, year, semester, block, sched } = req.body;
            const schedule = new Schedule_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                program,
                year,
                semester,
                block,
                sched,
            });
            const savedSched = yield schedule.save();
            res.status(201).json({ schedule: savedSched });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createSched = createSched;
function readSched(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            const schedule = yield Schedule_1.default.findById(scheduleID).select('-__v');
            schedule
                ? res.status(200).json({ schedule })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readSched = readSched;
function readAllSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schedules = yield Schedule_1.default.find().select('-__v');
            res.status(200).json({ schedules });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllSchedule = readAllSchedule;
;
function updateSched(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            console.log('Sched ID:', scheduleID);
            const schedule = yield Schedule_1.default.findById(scheduleID);
            if (schedule) {
                schedule.set(req.body);
                const updatedSched = yield schedule.save();
                return res.status(200).json({ schedules: updatedSched });
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
exports.updateSched = updateSched;
;
function deleteSched(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            const result = yield Schedule_1.default.findByIdAndDelete(scheduleID);
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
exports.deleteSched = deleteSched;
;
function addScheduleItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            const { courseCode, courseDescription, courseUnit, day, time, room, instructor } = req.body;
            const newSchedule = {
                _id: new mongoose_1.Types.ObjectId(),
                courseCode,
                courseDescription,
                courseUnit,
                day,
                time,
                room,
                instructor,
            };
            const updatedSched = yield Schedule_1.default.findByIdAndUpdate(scheduleID, { $push: { sched: newSchedule } }, { new: true });
            console.log('New Schedule:', newSchedule);
            if (updatedSched) {
                res.status(200).json({ sched: updatedSched });
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.addScheduleItem = addScheduleItem;
function updateScheduleItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            const scheduleIDToUpdate = req.params.scheduleIDToUpdate;
            const updatedScheduleData = req.body;
            const updatedSched = yield Schedule_1.default.findOneAndUpdate({ _id: scheduleID, 'sched._id': scheduleIDToUpdate }, {
                $set: {
                    'sched.$.courseCode': updatedScheduleData.courseCode,
                    'sched.$.courseDescription': updatedScheduleData.courseDescription,
                    'sched.$.courseUnit': updatedScheduleData.courseUnit,
                    'sched.$.day': updatedScheduleData.day,
                    'sched.$.time': updatedScheduleData.time,
                    'sched.$.room': updatedScheduleData.room,
                    'sched.$.instructor': updatedScheduleData.instructor,
                },
            }, { new: true });
            if (updatedSched) {
                res.status(200).json({ sched: updatedSched });
            }
            else {
                res.status(404).json({ message: 'Schedule or course not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.updateScheduleItem = updateScheduleItem;
function deleteScheduleItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleID = req.params.scheduleID;
            const scheduleIDToDelete = req.params.scheduleIDToDelete;
            const updatedSched = yield Schedule_1.default.findByIdAndUpdate(scheduleID, {
                $pull: { sched: { _id: new mongoose_1.Types.ObjectId(scheduleIDToDelete) } },
            }, { new: true });
            if (updatedSched) {
                res.status(200).json({ sched: updatedSched });
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.deleteScheduleItem = deleteScheduleItem;
