import "./App.css";
import VideoPlayer from "./VideoPlayer";
import { useRef } from "react";

function App() {
  const playerRef = useRef();
  const videoLink =
    "http://localhost:8000/uploads/courses/ffaeec79-7efe-4b3f-afe0-a97b33591a22/index.m3u8";
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{ src: videoLink, type: "application/x-mpegURL" }],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>
        <h1>Video Player</h1>
        <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
}

export default App;
