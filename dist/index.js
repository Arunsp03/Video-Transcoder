"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileservice_1 = require("./fileservice");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const startServer = () => {
    try {
        (0, fileservice_1.startFileWatcher)();
    }
    catch (err) {
        console.error(err);
    }
};
startServer();
