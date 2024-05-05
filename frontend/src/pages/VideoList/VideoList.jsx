import "./VideoList.css";
import { useEffect, useState } from "react";
import { getAllFolders } from "../../api.js";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllFolders();
      setFolders(data?.folders || []);
    })();
  }, []);

  const loadVideo = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <main>
      <button className="upload-btn-arr" onClick={() => navigate("/upload")}>
        Upload Video
      </button>
      <h1>Videos</h1>
      <div className="thumbnail-container">
        {folders.length > 0 &&
          folders.map((folder) => (
            <div key={folder} onClick={() => loadVideo(folder)}>
              <img
                src={`http://localhost:8000/uploads/courses/${folder}/thumbnail.jpg`}
              />
              <p>{folder}</p>
            </div>
          ))}
      </div>
    </main>
  );
};

export default VideoList;
