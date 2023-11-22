import { Response, Request } from "express";
import Students from "../models/Students";
import mongoose, { Types } from "mongoose";

export async function createStudent(req: Request, res: Response) {
  try {
    const { program, year, semester, block, courses } = req.body;
    
    const student = new Students({
      _id: new mongoose.Types.ObjectId(),
      program,
      year,
      semester,
      block,
      courses,
    });

    const savedStudent = await student.save();

    res.status(201).json({ student: savedStudent });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readStudent(req: Request, res: Response) {
    try {
      const studentID = req.params.studentID;
      const student = await Students.findById(studentID).select('-__v');
        
      student 
        ? res.status(200).json({ student }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  }  

export async function readAllStudents(req: Request, res: Response) {
    try {
      const students = await Students.find().select('-__v'); 
      res.status(200).json({ students }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };

export async function updateStudent(req: Request, res: Response) {
  try {
    const studentID = req.params.studentID;
    console.log('Student ID:', studentID);
    const student = await Students.findById(studentID);

    if (student) {
      student.set(req.body);
      const updatedStudent = await student.save();
      return res.status(200).json({ students: updatedStudent });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteStudent(req: Request, res: Response) {
    try {
      const studentID = req.params.studentID; 
      const result = await Students.findByIdAndDelete(studentID);
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  
  
export async function addCourseToStudent(req: Request, res: Response) {
  try {
    const studentID = req.params.studentID;

    const { code, description, units, labOrLec } = req.body;

    const newCourse = {
      _id: new Types.ObjectId(),
      code,
      description,
      units,
      labOrLec
    };

    const updatedStudent = await Students.findByIdAndUpdate(
      studentID,
      { $push: { courses: newCourse } },
      { new: true }
    );

    if (updatedStudent) {
      res.status(200).json({ student: updatedStudent });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const studentID = req.params.studentID;
    const courseIDToUpdate = req.params.courseIDToUpdate;

    const updatedCourseData  = req.body;

    const updatedStudent = await Students.findOneAndUpdate(
      { _id: studentID, 'courses._id': courseIDToUpdate },
      {
        $set: {
          'courses.$.code': updatedCourseData.code,
          'courses.$.description': updatedCourseData.description,
          'courses.$.units': updatedCourseData.units,
          'courses.$.labOrLec': updatedCourseData.labOrLec,
        },
      },
      { new: true }
    );

    if (updatedStudent) {
      res.status(200).json({ student: updatedStudent });
    } else {
      res.status(404).json({ message: 'Student or course not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const studentID = req.params.studentID;
    const courseIDToDelete = req.params.courseIDToDelete;

    const updatedStudent = await Students.findByIdAndUpdate(
      studentID,
      {
        $pull: { courses: { _id: new Types.ObjectId(courseIDToDelete) } },
      },
      { new: true }
    );

    if (updatedStudent) {
      res.status(200).json({ student: updatedStudent });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
    }
}


  
  