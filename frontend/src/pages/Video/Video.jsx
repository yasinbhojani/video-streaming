import "./Video.css";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useRef } from "react";

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  if (!id) {
    goBack();
  }

  const playerRef = useRef();
  const videoLink = `http://localhost:8000/uploads/courses/${id}/index.m3u8`;

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    aspectRatio: "16:9",
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
    <div className="video-page">
      <p className="go-back-arr" onClick={goBack}>
        &larr; Go Back
      </p>
      <h1>Video Player</h1>
      <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export default Video;
