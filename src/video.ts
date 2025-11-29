import { startFFMPEGContainer } from "./shell";

export class Video {
  private _sourcePath: string;
  private _sourceExtensionType: string;
  private _destinationExtensionType: string;
  private _resolution:string
  constructor(sourcePath: string, destinationExtensionType: string,resolution:string) {
    this._sourcePath = sourcePath;
    const sourcePathParams: string[] = sourcePath.split(".");

    this._sourceExtensionType = sourcePathParams[sourcePathParams.length - 1];

    this._destinationExtensionType = destinationExtensionType;
    this._resolution=resolution
  }
  get SourcePath() {
    return this._sourcePath;
  }
  set SourcePath(sourcePath: string) {
    this._sourcePath = sourcePath;
  }
  get SourceExtensionType() {
    return this._sourceExtensionType;
  }
  set SourceExtensionType(sourceExtensionType: string) {
    this._sourceExtensionType = sourceExtensionType;
  }
  get DestinationExtensionType() {
    return this._destinationExtensionType;
  }
  set DestinationExtensionType(destinationExtensionType: string) {
    this._destinationExtensionType = destinationExtensionType;
  }
  get Resolution():string{
    return this._resolution;
  }
  set Resolution(resolution:string){
    this._resolution=resolution
  }
  startEncoding(){
    startFFMPEGContainer(this);
  }
}
