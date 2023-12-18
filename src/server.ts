import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import courses from './routes/Courses';
import students from './routes/Students';
import teachers from './routes/Teachers';
import rooms from './routes/Rooms';
import schedule from './routes/Schedule';
import users from './routes/Users'
import cors from 'cors';

const router = express();

//connection
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected To mongoDB');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect');
    Logging.error(error);
  });


// information if connection started
const StartServer = () => {
  try{
    router.use((req, res, next) => {
      //request
      Logging.info(
        `Incomming -> Method: [${req.method}] - Url: [${req.url} - IP [${req.socket.remoteAddress}]]`
      );
      //response
      res.on('finish', () => {
        Logging.info(
          `Incomming -> Method: [${req.method}] - Url: [${req.url} - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]]`
        );
      });
      next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //API rules
    router.use(
      cors({
        origin: 'http://3.27.192.58:5000', // Adjust the origin based on your Flask app
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Include cookies in the requests
        optionsSuccessStatus: 204, // Set the status code for successful preflight requests
      })
    );

    //routes
    router.use('/Courses', courses);
    router.use('/Students', students);
    router.use('/Teachers', teachers);
    router.use('/Rooms', rooms);
    router.use('/Schedule', schedule);
    router.use('/Users', users);


    //error handling
    router.use((req, res, next) => {
      const error = new Error('not found');
      Logging.error(error);

      return res.status(404).json({ message: error.message });
    });
    

    //http
    http
      .createServer(router)
      .listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`)
      );


    }catch (error) {
      Logging.error('Error starting server:');
      Logging.error(error);
  }
};
