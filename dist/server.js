"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const router = (0, express_1.default)();
//connection
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logging_1.default.info('Connected To mongoDB');
})
    .catch((error) => {
    logging_1.default.error('Unable to connect');
    logging_1.default.error(error);
});
// information if mongodb is connected
const StartServer = () => {
    try {
        router.use((req, res, next) => {
            //request
            logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url} - IP [${req.socket.remoteAddress}]]`);
            //response
            res.on("finish", () => {
                logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url} - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]]`);
            });
            next();
        });
        router.use(express_1.default.urlencoded({ extended: true }));
        router.use(express_1.default.json());
        //API rules
        router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
            if (req.method == 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }
            next();
        });
        //routes
        //check
        router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
        //error handling
        router.use((req, res, next) => {
            const error = new Error('not found');
            logging_1.default.error(error);
            return res.status(404).json({ message: error.message });
        });
        //http
        http_1.default
            .createServer(router)
            .listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
    }
    catch (error) {
        logging_1.default.error('Error starting server:');
        logging_1.default.error(error);
    }
};
