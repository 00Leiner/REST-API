import { Response, Request } from "express";
import Schedule, { ISchedule } from "../models/Schedule";
import mongoose, { Types } from "mongoose";

export async function createOptions(req: Request, res: Response) {
  try {
    const { options, programs } = req.body;

    const Options = new Schedule({
      options,
      programs,
    });

    const savedOptions = await Options.save();

    res.status(201).json({ Schedule: savedOptions });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readOptions(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const options = await Schedule.findById(optionsID).select('-__v');

    options
      ? res.status(200).json({ options })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readAllOptions(req: Request, res: Response) {
  try {
    const options = await Schedule.find().select('-__v');
    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function updateOptions(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const options = await Schedule.findById(optionsID);

    if (options) {
      options.set(req.body);
      const updatedOptions = await options.save();
      return res.status(200).json({ Schedules: updatedOptions });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteOptions(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const result = await Schedule.findByIdAndDelete(optionsID);

    return result
      ? res.status(204).send()
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function createSched(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;

    const { program, year, semester, block, sched } = req.body;

    const schedule = new Schedule({
      _id: new mongoose.Types.ObjectId(),
      program,
      year,
      semester,
      block,
      sched,
    });

    const savedSched = await Schedule.findByIdAndUpdate(
      optionsID,
      { $push: { 'schedule?.programs': schedule } },
      { new: true, arrayFilters: [{ 'programs._id': optionsID }] }
    );
    if (savedSched) {
      res.status(200).json({ programs: savedSched });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function readSched(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const scheduleProgram = req.params.scheduleProgram;
    const scheduleYear = req.params.scheduleYear;
    const scheduleSemester = req.params.scheduleSemester;
    const scheduleBlock = req.params.scheduleBlock;
    const schedule = await Schedule.findOne({ _id: optionsID }).select('-__v');

    if (schedule) {
      const programs = schedule.programs.filter((program) => {
        return (
          program.program === scheduleProgram &&
          program.year === scheduleYear &&
          program.semester === scheduleSemester &&
          program.block === scheduleBlock
        );
      });

      if (programs) {
        res.status(200).json({ programs });
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

export async function readAllSchedule(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const options = await Schedule.findById(optionsID).select('-__v');

    if (options) {
      res.status(200).json({ programs: options.programs[0].sched });
    } else {
      res.status(404).json({ message: 'Options not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSched(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const scheduleID = req.params.scheduleID;

    const updatedOptionsData = req.body;

    const updatedOption = await Schedule.findOneAndUpdate(
      { _id: optionsID, 'schedule?.programs._id': scheduleID },
      {
        $set: {
          'schedule?.programs.program':
          updatedOptionsData.program,
          'schedule?.programs.year':
          updatedOptionsData.year,
          'schedule?.programs.semester': updatedOptionsData.semester,
          'schedule?.programs.block': updatedOptionsData.block
        },
      },
      { new: true, arrayFilters: [{ 'programs._id': scheduleID }] }
    );

    if (updatedOption) {
      res.status(200).json({ programs: updatedOption.programs });
    } else {
      res.status(404).json({ message: 'Schedule or course not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
}

export async function deleteSched(req: Request, res: Response) {
  try {
    const optionsID = req.params.optionsID;
    const scheduleID = req.params.scheduleID;

    const updatedSched = await Schedule.findByIdAndUpdate(
      optionsID,
      {
        $pull: { 'SChedule.programs': { _id: new Types.ObjectId(scheduleID) } },
      },
      { new: true, arrayFilters: [{ 'outer._id': optionsID }] }
    );

    if (updatedSched) {
      res.status(200).json({ programs: updatedSched.programs });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
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
      { $push: { 'schedule?.programs[programIndex].sched': newSchedule } },
      { new: true, arrayFilters: [{ 'programs._id': scheduleID }] }
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
      { _id: scheduleID, 'schedule?.programs.$[outer].sched._id': scheduleIDToUpdate },
      {
        $set: {
          'schedule?.programs.$[outer].sched.$.courseCode':
            updatedScheduleData.courseCode,
          'schedule?.programs.$[outer].sched.$.courseDescription':
            updatedScheduleData.courseDescription,
          'schedule?.programs.$[outer].sched.$.courseUnit': updatedScheduleData.courseUnit,
          'schedule?.programs.$[outer].sched.$.day': updatedScheduleData.day,
          'schedule?.programs.$[outer].sched.$.time': updatedScheduleData.time,
          'schedule?.programs.$[outer].sched.$.room': updatedScheduleData.room,
          'schedule?.programs.$[outer].sched.$.instructor':
            updatedScheduleData.instructor,
        },
      },
      { new: true, arrayFilters: [{ 'programs._id': scheduleID }] }
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
        $pull: { 'schedule?.programs.$[outer].sched': { _id: new Types.ObjectId(schedCourseCode) } },
      },
      { new: true, arrayFilters: [{ 'programs._id': scheduleID }] }
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
