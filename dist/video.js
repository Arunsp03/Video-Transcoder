"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const shell_1 = require("./shell");
class Video {
    constructor(sourcePath, destinationExtensionType, resolution) {
        this._sourcePath = sourcePath;
        const sourcePathParams = sourcePath.split(".");
        this._sourceExtensionType = sourcePathParams[sourcePathParams.length - 1];
        this._destinationExtensionType = destinationExtensionType;
        this._resolution = resolution;
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
    get DestinationExtensionType() {
        return this._destinationExtensionType;
    }
    set DestinationExtensionType(destinationExtensionType) {
        this._destinationExtensionType = destinationExtensionType;
    }
    get Resolution() {
        return this._resolution;
    }
    set Resolution(resolution) {
        this._resolution = resolution;
    }
    startEncoding() {
        (0, shell_1.startFFMPEGContainer)(this);
    }
}
exports.Video = Video;
