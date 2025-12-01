# Video Transcoder 🚀

**Background video transcoding service** that watches a source folder, pushes file paths into a Redis queue, and transcodes them using Dockerized FFmpeg (H.264/AAC) in worker containers. Automatically deletes source files after successful processing.

## ✨ Features

- **📁 Real-time file watching** with [Chokidar](https://github.com/paulmillr/chokidar) to detect new videos in a source folder 
- **📬 Reliable job queue** powered by [BullMQ](https://bullmq.io) + Redis for durable, restart-safe processing 
- **🎥 Advanced encoding**: H.264 video + AAC audio with Lanczos scaling via the `jrottenberg/ffmpeg` Docker image 
- **⚖️ Configurable output**: Resolution and container type controlled via environment variables (e.g., 1080p `.mp4`) 
- **🧱 Scalable workers**: Run multiple worker containers in parallel to consume from the same queue
- **♻️ Auto-cleanup**: Deletes source files after successful transcoding to save disk space 


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
REDIS_CLIENT_PORT=6379
REDIS_CLIENT_URL=127.0.0.1
TRANSCODING_RESOLUTUION=1920x1080
TRANSCODING_FILETYPE=.mp4

### 3. Create Folders
mkdir sourcevideos finalvideos


### 4. Run
npm start


### 5. Usage
Drop the video into the sourcevideos folder.


✅ Transcodes the source video and places it into the finalvideos folder.

