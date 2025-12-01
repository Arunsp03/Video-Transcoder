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
exports.Video = void 0;
const shell_1 = require("./shell");
class Video {
    constructor(sourcePath) {
        this._sourcePath = sourcePath;
        const sourcePathParams = sourcePath.split(".");
        this._sourceExtensionType = sourcePathParams[sourcePathParams.length - 1];
    }
    get SourcePath() {
        return this._sourcePath;
    }
    set SourcePath(sourcePath) {
        this._sourcePath = sourcePath;
    }
    get SourceExtensionType() {
        return this._sourceExtensionType;
    }
    set SourceExtensionType(sourceExtensionType) {
        this._sourceExtensionType = sourceExtensionType;
    }
    startEncoding() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, shell_1.startFFMPEGContainer)(this);
        });
    }
}
exports.Video = Video;
