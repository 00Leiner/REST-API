import { Response, Request } from "express";
import Teachers from "../models/Teachers";
import mongoose from "mongoose";

export async function createTeacher(req: Request, res: Response) {
  try {
    const { name, specialized, preferred } = req.body;
    
    const teacher = new Teachers({
      _id: new mongoose.Types.ObjectId(),
      name,
      specialized
    });

    const savedTeacher = await teacher.save();

    res.status(201).json({ teacher: savedTeacher });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readTeacher(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
      const teacher = await Teachers.findById(teacherID).select('-__v');
        
      teacher 
        ? res.status(200).json({ teacher }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  }  

export async function readAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await Teachers.find().select('-__v'); 
      res.status(200).json({ teachers }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };
  

export async function updateTeacher(req: Request, res: Response) {
  try {
    const teacherID = req.params.teacherID;
    console.log('Teacher ID:', teacherID);
    const teacher = await Teachers.findById(teacherID);

    if (teacher) {
      teacher.set(req.body);
      const updatedTeacher = await teacher.save();
      return res.status(200).json({ teachers: updatedTeacher });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteTeacher(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID; 
      const result = await Teachers.findByIdAndDelete(teacherID);
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  