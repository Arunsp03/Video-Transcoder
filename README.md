# Video Transcoder 🚀

**Interactive video transcoding service** that watches a source folder, prompts for output format/resolution per file, and transcodes using Dockerized FFmpeg (H.264/AAC). Auto-deletes source files after successful processing.

## ✨ Features

- **📁 Real-time file watching** with [Chokidar](https://github.com/paulmillr/chokidar)
- **🎛️ Interactive prompts** for format (mov/mp4/webm) & resolution per file
- **🎥 Advanced encoding**: H.264 video + AAC audio + Lanczos scaling
- **♻️ Auto-cleanup**: Deletes source files after successful transcoding
- **⚡ Sequential queue**: Handles multiple files without overlap

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone & Install
git clone https://github.com/Arunsp03/Video-Transcoder.git
npm install


### 2. Setup Environment
Create `.env` file:
SOURCE_FOLDER=sourcevideos
DESTINATION_FOLDER=finalvideos
SOURCE_FOLDER_PATH=./sourcevideos


### 3. Create Folders
mkdir sourcevideos finalvideos


### 4. Run
npm start


### 5. Usage
Step 1 : Drop the video into the sourcevideos folder.
Step 2 : Enter the destination file type.
Step 3 : Enter the destination file resolution.

✅ Transcodes the source video and places it into the finalvideos folder.
✅ Deletes the source video from the sourcevideos folder.
