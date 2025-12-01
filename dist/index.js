"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileservice_1 = require("./fileservice");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, fileservice_1.startFileWatcher)();
    }
    catch (err) {
        console.error(err);
    }
});
startServer();
