import { Response, Request } from "express";
import Users from "../models/Users";
import mongoose from "mongoose";

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = new Users({
      _id: new mongoose.Types.ObjectId(),
      username,
      password,
    });

    const savedUser = await user.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    const user = await Users.findById(userID).select('-__v');

    user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "Not found" });

  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readAllUsers(req: Request, res: Response) {
  try {
    const users = await Users.find().select('-__v');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function updateUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    console.log('User ID:', userID);
    const user = await Users.findById(userID);

    if (user) {
      user.set(req.body);
      const updatedUser = await user.save();
      return res.status(200).json({ users: updatedUser });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    const result = await Users.findByIdAndDelete(userID);

    return result
      ? res.status(204).send()
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readUsernamePassword(req: Request, res: Response) {
  const { username, password } = req.query;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the user exists in the database and credentials match
  const user = await Users.find((u: { id: number; username: string; password: string }) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // If user exists and credentials match, return success message
  return res.status(200).json({ message: 'Login successful', user });
};