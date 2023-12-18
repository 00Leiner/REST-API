import { Response, Request } from "express";
import Schedule, { ISchedule } from "../models/Schedule";
import mongoose from 'mongoose';

export async function readOptions(req: Request, res: Response) {
  try {
    const schedules = await Schedule.find().select('-__v'); 
    res.status(200).json({ schedules }); 
  } catch (error) {
    res.status(500).json({ error }); 
    res.render('error', { error: error });
  }
};

export async function deleteAllOptions(req: Request, res: Response){
  try {
    const scheduleID = req.params.scheduleID; 
      const result = await Schedule.deleteMany({});
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
  }
}

export async function readAllPrograms(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const schedule = await Schedule.findById(scheduleID).select('-__v');
      
    schedule
      ? res.status(200).json({ schedule }) 
      : res.status(404).json({ message: "Not found" });
      
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}; 

export async function readProgram(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const programID = req.params.programID as string; // Assuming you have a programID parameter

    // Using findById to retrieve a specific schedule by ID
    const schedule = await Schedule.findById(scheduleID);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Find the specific program within the programs array
    const program = schedule.programs.find((p) => p._id.toString() === programID);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function readAllSched(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const programID = req.params.programID; // Assuming you have a unique identifier for programs

    // Using findById to retrieve a specific schedule by ID
    const schedule = await Schedule.findById(scheduleID);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Find the program within the programs array based on a unique identifier (e.g., programID)
    const program = schedule.programs.find(program => program._id === programID);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Extract the sched array from the found program
    const schedArray = program.sched;

    res.status(200).json({ schedArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function readSched(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const programID = req.params.programID; // Assuming you have a unique identifier for programs
    const schedID = req.params.schedID; // Assuming you have a unique identifier for sched within a program

    // Using findById to retrieve a specific schedule by ID
    const schedule = await Schedule.findById(scheduleID);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Find the program within the programs array based on a unique identifier (e.g., programID)
    const program = schedule.programs.find((program) => program._id.toString() === programID);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Find the specific sched within the sched array of the program
    const sched = program.sched.find((sched) => sched._id.toString() === schedID);

    if (!sched) {
      return res.status(404).json({ message: 'Specific sched not found' });
    }

    res.status(200).json({ sched });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
