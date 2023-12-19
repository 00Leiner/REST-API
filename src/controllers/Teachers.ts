import { Response, Request } from "express";
import Teachers from "../models/Teachers";
import mongoose, { Types } from "mongoose";

export async function createTeacher(req: Request, res: Response) {
  try {
    const { name, specialized } = req.body;
    
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
};

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
  };  

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
  
      const updatedTeacher = await Teachers.findOneAndUpdate(
        { _id: teacherID },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (updatedTeacher) {
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
  
export async function addCourse(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
  
      const { code, description, units, type } = req.body;
  
      const newCourse = {
        _id: new Types.ObjectId(),
        code,
        description,
        units,
        type
      };
  
      const updatedTeacher = await Teachers.findByIdAndUpdate(
        teacherID,
        { $push: { specialized: newCourse } },
        { new: true }
      );
  
      if (updatedTeacher) {
        res.status(200).json({ teacher: updatedTeacher });
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  
export async function updateCourse(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
      const courseIDToUpdate = req.params.courseID;
  
      const updatedCourseData  = req.body;
  
      const updatedTeacher = await Teachers.findOneAndUpdate(
        { _id: teacherID, 'courses._id': courseIDToUpdate },
        {
          $set: {
            'courses.$.code': updatedCourseData.code,
            'courses.$.description': updatedCourseData.description,
            'courses.$.units': updatedCourseData.units,
            'courses.$.type': updatedCourseData.type,
          },
        },
        { new: true}
      );
  
      if (updatedTeacher) {
        res.status(200).json({ specialized: updatedTeacher.specialized });
      } else {
        res.status(404).json({ message: 'Teacher or course not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  
export async function deleteCourse(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
      const courseIDToDelete = req.params.courseID;
  
      const updatedTeacher = await Teachers.findByIdAndUpdate(
        teacherID,
        {
          $pull: { courses: { _id: new Types.ObjectId(courseIDToDelete) } },
        },
        { new: true }
      );
  
      if (updatedTeacher) {
        res.status(200).json({ specialized: updatedTeacher.specialized });
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
      }
  };
  
export async function readAllCourse(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
      const teacher = await Teachers.findById(teacherID).select('-__v');
  
      if (teacher) {
        res.status(200).json({ specialized: teacher.specialized });
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
export async function readCourse(req: Request, res: Response) {
    try {
      const teacherID = req.params.teacherID;
      const courseCode = req.params.courseCode;
  
      const teacher = await Teachers.findById(teacherID);
  
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found for the given teacherID' });
      }
  
      // Find the course based on the courseID
      const specialized = teacher.specialized.find((c) => c.code === courseCode);
  
      if (specialized) {
        return res.status(200).json({ course: specialized });
      } else {
        return res.status(404).json({ message: 'Course code not exist' });
      }
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  