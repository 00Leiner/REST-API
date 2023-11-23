"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Rooms_1 = require("../controllers/Rooms");
const router = express_1.default.Router();
router.post('/create', Rooms_1.createRoom);
router.get('/get/:roomID', Rooms_1.readRoom);
router.get('/get/', Rooms_1.readAllRooms);
router.patch('/update/:roomID', Rooms_1.updateRoom);
router.delete('/delete/:roomID', Rooms_1.deleteRoom);
exports.default = router;
