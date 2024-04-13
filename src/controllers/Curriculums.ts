import { Response, Request } from "express";
import Curriculums from "../models/Curriculums";
import mongoose, { Types } from "mongoose";

export async function createCurriculum(req: Request, res: Response) {
  try {
    const { program, year, semester, major, curriculum } = req.body;
    
    const newCurriculum = new Curriculums({
      _id: new mongoose.Types.ObjectId(),
      program, 
      year, 
      semester, 
      major,
      curriculum
    });

    const savedCurriculum = await newCurriculum.save();

    res.status(201).json({ curriculum: savedCurriculum });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readCurriculum(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID;
      const curriculum = await Curriculums.findById(curriculumID).select('-__v');
        
      curriculum 
        ? res.status(200).json({ curriculum }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };  

export async function readAllCurriculums(req: Request, res: Response) {
    try {
      const curriculums = await Curriculums.find().select('-__v'); 
      res.status(200).json({ curriculums }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };
  
export async function updateCurriculum(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID;
      console.log('Curriculum ID:', curriculumID);
  
      const updatedCurriculum = await Curriculums.findOneAndUpdate(
        { _id: curriculumID },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (updatedCurriculum) {
        return res.status(200).json({ curriculums: updatedCurriculum });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
};

export async function deleteCurriculum(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID; 
      const result = await Curriculums.findByIdAndDelete(curriculumID);
      
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
      const curriculumID = req.params.curriculumID;
  
      const { code, description, units, type } = req.body;
  
      const newCourse = {
        _id: new Types.ObjectId(),
        code,
        description,
        units,
        type
      };
  
      const updatedCurriculum = await Curriculums.findByIdAndUpdate(
        curriculumID,
        { $push: { curriculum: newCourse } },
        { new: true }
      );
  
      if (updatedCurriculum) {
        res.status(200).json({ curriculum: updatedCurriculum });
      } else {
        res.status(404).json({ message: 'Curriculum not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  
export async function updateCourse(req: Request, res: Response) {
  try {
    const curriculumID = req.params.curriculumID;
    const courseIDToUpdate = req.params.courseID;

    const updatedCourseData = req.body;

    const updatedCurriculum = await Curriculums.findOneAndUpdate(
      { 
        _id: curriculumID, 
        'curriculum._id': courseIDToUpdate 
      },
      {
        $set: {
          'curriculum.$[course].code': updatedCourseData.code,
          'curriculum.$[course].description': updatedCourseData.description,
          'curriculum.$[course].units': updatedCourseData.units,
          'curriculum.$[course].type': updatedCourseData.type,
        },
      },
      { 
        new: true,
        arrayFilters: [{ 'course._id': courseIDToUpdate }]
      }
    );

    if (updatedCurriculum) {
      res.status(200).json({ curriculum: updatedCurriculum });
    } else {
      res.status(404).json({ message: 'Curriculum or course not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};
  
export async function deleteCourse(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID;
      const courseIDToDelete = req.params.courseID;
  
      const updatedCurriculum = await Curriculums.findByIdAndUpdate(
        curriculumID,
        {
          $pull: { curriculum: { _id: new Types.ObjectId(courseIDToDelete) } },
        },
        { new: true }
      );
  
      if (updatedCurriculum) {
        res.status(200).json({ curriculum: updatedCurriculum.curriculum });
      } else {
        res.status(404).json({ message: 'Curriculum not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
      }
  };
  
export async function readAllCourse(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID;
      const readCurriculum = await Curriculums.findById(curriculumID).select('-__v');
  
      if (readCurriculum) {
        res.status(200).json({ curriculum: readCurriculum.curriculum });
      } else {
        res.status(404).json({ message: 'Curriculum not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
export async function readCourse(req: Request, res: Response) {
    try {
      const curriculumID = req.params.curriculumID;
      const courseCode = req.params.courseCode;
  
      const readCurriculum = await Curriculums.findById(curriculumID);
  
      if (!readCurriculum) {
        return res.status(404).json({ message: 'Curriculum not found for the given curriculumID' });
      }
  
      // Find the course based on the course code
      const course = readCurriculum.curriculum.find((c) => c.code === courseCode);
  
      if (course) {
        return res.status(200).json({ course });
      } else {
        return res.status(404).json({ message: 'Course code not found in the curriculum' });
      }
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  