import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";

export const uploadVideo = (req, res) => {
  const lessonId = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/courses/${lessonId}/`;
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hlsPath", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // ffmpeg
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath} -vf "thumbnail,scale=640:360:force_original_aspect_ratio=decrease" -frames:v 1 "${outputPath}/thumbnail.jpg"`;

  // no queue because of POC (do not use in PRODUCTION)
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
    res.json({
      message: "video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
};
