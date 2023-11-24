import { Response, Request } from "express";
import Courses from "../models/Courses";
import mongoose from "mongoose";

export async function createCourse(req: Request, res: Response){
  try {
    const { code, description, units, type } = req.body;
    
    const courses = new Courses({
      _id: new mongoose.Types.ObjectId(),
      code, 
      description, 
      units,
      type
    });

    const savedCourse = await courses.save();

    res.status(201).json({ courses: savedCourse });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readCourse(req: Request, res: Response) {
    try {
      const courseID = req.params.courseID;
      const course = await Courses.findById(courseID).select('-__v');
        
      course 
        ? res.status(200).json({ course }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  }  

export async function readAllCourses(req: Request, res: Response) {
    try {
      const courses = await Courses.find().select('-__v'); 
      res.status(200).json({ courses }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };
  

export async function updateCourse(req: Request, res: Response) {
  try {
    const courseID = req.params.courseID;
    console.log('Course ID:', courseID);
    const course = await Courses.findById(courseID);

    if (course) {
      course.set(req.body);
      const updatedCourse = await course.save();
      return res.status(200).json({ courses: updatedCourse });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteCourse(req: Request, res: Response) {
    try {
      const courseID = req.params.courseID; 
      const result = await Courses.findByIdAndDelete(courseID);
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  