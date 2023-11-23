import express from "express";
import { createUser, readUser, readAllUsers, updateUser, deleteUser } from "../controllers/Users";


const router = express.Router();

router.post('/create', createUser);
router.get('/get/:userID', readUser);
router.get('/get/', readAllUsers);
router.patch('/update/:userID', updateUser);
router.delete('/delete/:userID', deleteUser);

export default router;