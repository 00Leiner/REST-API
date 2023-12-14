import { Response, Request } from "express";
import Schedule, { ISchedule } from "../models/Schedule";
import mongoose, { Types } from "mongoose";

export async function createSched(req: Request, res: Response) {
  try {
    const { options, programs } = req.body;

    const schedule = new Schedule({
      options,
      programs,
    });

    const savedSched = await schedule.save();

    res.status(201).json({ schedule: savedSched });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readSched(req: Request, res: Response) {
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
}

export async function readAllSchedule(req: Request, res: Response) {
  try {
    const schedules = await Schedule.find().select('-__v');
    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function updateSched(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const schedule = await Schedule.findById(scheduleID);

    if (schedule) {
      schedule.set(req.body);
      const updatedSched = await schedule.save();
      return res.status(200).json({ schedules: updatedSched });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function deleteSched(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const result = await Schedule.findByIdAndDelete(scheduleID);

    return result
      ? res.status(204).send()
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function addScheduleItem(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;

    const {
      courseCode,
      courseDescription,
      courseUnit,
      day,
      time,
      room,
      instructor,
    } = req.body;

    const newSchedule = {
      _id: new Types.ObjectId(),
      courseCode,
      courseDescription,
      courseUnit,
      day,
      time,
      room,
      instructor,
    };

    const updatedSched = await Schedule.findByIdAndUpdate(
      scheduleID,
      { $push: { 'programs.$[outer].sched': newSchedule } },
      { new: true, arrayFilters: [{ 'outer._id': scheduleID }] }
    );
    if (updatedSched) {
      res.status(200).json({ sched: updatedSched });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function updateScheduleItem(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const scheduleIDToUpdate = req.params.coursecode;

    const updatedScheduleData = req.body;

    const updatedSched = await Schedule.findOneAndUpdate(
      { _id: scheduleID, 'programs.$[outer].sched._id': scheduleIDToUpdate },
      {
        $set: {
          'programs.$[outer].sched.$.courseCode':
            updatedScheduleData.courseCode,
          'programs.$[outer].sched.$.courseDescription':
            updatedScheduleData.courseDescription,
          'programs.$[outer].sched.$.courseUnit': updatedScheduleData.courseUnit,
          'programs.$[outer].sched.$.day': updatedScheduleData.day,
          'programs.$[outer].sched.$.time': updatedScheduleData.time,
          'programs.$[outer].sched.$.room': updatedScheduleData.room,
          'programs.$[outer].sched.$.instructor':
            updatedScheduleData.instructor,
        },
      },
      { new: true, arrayFilters: [{ 'outer._id': scheduleID }] }
    );

    if (updatedSched) {
      res.status(200).json({ sched: updatedSched.programs[0].sched });
    } else {
      res.status(404).json({ message: 'Schedule or course not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function deleteScheduleItem(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const schedCourseCode = req.params.coursecode;

    const updatedSched = await Schedule.findByIdAndUpdate(
      scheduleID,
      {
        $pull: { 'programs.$[outer].sched': { _id: new Types.ObjectId(schedCourseCode) } },
      },
      { new: true, arrayFilters: [{ 'outer._id': scheduleID }] }
    );

    if (updatedSched) {
      res.status(200).json({ sched: updatedSched.programs[0].sched });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readAllScheduleItem(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const schedule = await Schedule.findById(scheduleID).select('-__v');

    if (schedule) {
      res.status(200).json({ sched: schedule.programs[0].sched });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function readScheduleItem(req: Request, res: Response) {
  try {
    const scheduleID = req.params.scheduleID;
    const schedCourseCode = req.params.coursecode;
    const schedule = await Schedule.findOne({ _id: scheduleID }).select('-__v');

    if (schedule) {
      const sched = await schedule.programs[0].sched.find(
        (sched) => sched.courseCode === schedCourseCode
      );

      if (sched) {
        res.status(200).json({ sched });
      } else {
        res
          .status(404)
          .json({ message: 'Course not found for the given courseID' });
      }
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
