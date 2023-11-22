import express from "express";
import { createRoom, readRoom, readAllRooms, updateRoom, deleteRoom } from "../controllers/Rooms";


const router = express.Router();

router.post('/create', createRoom);
router.get('/get/:roomID', readRoom);
router.get('/get/', readAllRooms);
router.patch('/update/:roomID', updateRoom);
router.delete('/delete/:roomID', deleteRoom);

export default router;