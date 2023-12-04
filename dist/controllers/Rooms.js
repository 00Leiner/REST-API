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
exports.deleteRoom = exports.updateRoom = exports.readAllRooms = exports.readRoom = exports.createRoom = void 0;
const Rooms_1 = __importDefault(require("../models/Rooms"));
const mongoose_1 = __importDefault(require("mongoose"));
function createRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, type } = req.body;
            const room = new Rooms_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name,
                type,
            });
            const savedRoom = yield room.save();
            res.status(201).json({ room: savedRoom });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createRoom = createRoom;
;
function readRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomID = req.params.roomID;
            const room = yield Rooms_1.default.findById(roomID).select('-__v');
            room
                ? res.status(200).json({ room })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readRoom = readRoom;
;
function readAllRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rooms = yield Rooms_1.default.find().select('-__v');
            res.status(200).json({ rooms });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllRooms = readAllRooms;
;
function updateRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomID = req.params.roomID;
            console.log('Room ID:', roomID);
            const room = yield Rooms_1.default.findById(roomID);
            if (room) {
                room.set(req.body);
                const updatedRoom = yield room.save();
                return res.status(200).json({ rooms: updatedRoom });
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
exports.updateRoom = updateRoom;
;
function deleteRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomID = req.params.roomID;
            const result = yield Rooms_1.default.findByIdAndDelete(roomID);
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
exports.deleteRoom = deleteRoom;
;
