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
exports.deleteUser = exports.updateUser = exports.readAllUsers = exports.readUser = exports.createUser = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const mongoose_1 = __importDefault(require("mongoose"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = new Users_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                username,
                password,
            });
            const savedUser = yield user.save();
            res.status(201).json({ user: savedUser });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.createUser = createUser;
;
function readUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = req.params.userID;
            const user = yield Users_1.default.findById(userID).select('-__v');
            user
                ? res.status(200).json({ user })
                : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readUser = readUser;
;
function readAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield Users_1.default.find().select('-__v');
            res.status(200).json({ users });
        }
        catch (error) {
            res.status(500).json({ error });
            res.render('error', { error: error });
        }
    });
}
exports.readAllUsers = readAllUsers;
;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = req.params.userID;
            console.log('User ID:', userID);
            const user = yield Users_1.default.findById(userID);
            if (user) {
                user.set(req.body);
                const updatedUser = yield user.save();
                return res.status(200).json({ users: updatedUser });
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
exports.updateUser = updateUser;
;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = req.params.userID;
            const result = yield Users_1.default.findByIdAndDelete(userID);
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
exports.deleteUser = deleteUser;
;
