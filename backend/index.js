import express from "express";
import cors from "cors";
import { upload } from "./config/multer.js";
import { uploadVideo } from "./controller/uploadVideo.js";
import { getAllVideos } from "./controller/getAllVideos.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/videos", getAllVideos);
app.post("/upload", upload.single("file"), uploadVideo);

app.listen(8000, () => {
  console.log("server listening on port 3000");
});
