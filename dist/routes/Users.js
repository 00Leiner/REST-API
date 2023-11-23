"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../controllers/Users");
const router = express_1.default.Router();
router.post('/create', Users_1.createUser);
router.get('/get/:userID', Users_1.readUser);
router.get('/get/', Users_1.readAllUsers);
router.patch('/update/:userID', Users_1.updateUser);
router.delete('/delete/:userID', Users_1.deleteUser);
exports.default = router;
