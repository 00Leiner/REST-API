import { Response, Request } from "express";
import Rooms from "../models/Rooms";
import mongoose from "mongoose";

export async function createRoom(req: Request, res: Response) {
  try {
    const { name, type } = req.body;
    
    const room = new Rooms({
      _id: new mongoose.Types.ObjectId(),
      name,
      type,
    });

    const savedRoom = await room.save();

    res.status(201).json({ room: savedRoom });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readRoom(req: Request, res: Response) {
    try {
      const roomID = req.params.roomID;
      const room = await Rooms.findById(roomID).select('-__v');
        
      room 
        ? res.status(200).json({ room }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  }  

export async function readAllRooms(req: Request, res: Response) {
    try {
      const rooms = await Rooms.find().select('-__v'); 
      res.status(200).json({ rooms }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };
  

export async function updateRoom(req: Request, res: Response) {
  try {
    const roomID = req.params.roomID;
    console.log('Room ID:', roomID);
    const room = await Rooms.findById(roomID);

    if (room) {
      room.set(req.body);
      const updatedRoom = await room.save();
      return res.status(200).json({ rooms: updatedRoom });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteRoom(req: Request, res: Response) {
    try {
      const roomID = req.params.roomID; 
      const result = await Rooms.findByIdAndDelete(roomID);
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  