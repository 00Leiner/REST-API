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
    router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
      );
      if (req.method == 'OPTIONS') {
        res.header(
          'Access-Control-Allow-Methods',
          'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
      }
      next();
    });

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
