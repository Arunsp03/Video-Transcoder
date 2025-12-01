import { startFFMPEGContainer } from "./shell"; 

export class Video {
  private _sourcePath: string;
  private _sourceExtensionType: string;

  constructor(sourcePath: string) {
    this._sourcePath = sourcePath;
    const sourcePathParams: string[] = sourcePath.split(".");

    this._sourceExtensionType = sourcePathParams[sourcePathParams.length - 1];

   
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

  async startEncoding  (){
    await startFFMPEGContainer(this);
  }
}
