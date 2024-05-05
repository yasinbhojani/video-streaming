import React, { useState } from "react";
import "./UploadVideo.css";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const goBack = () => {
    navigate("/");
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      window.alert("upload a file before submitting");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.lessonId) {
          setMessage(
            `Video Upload Successfully. \n Video ID: ${data?.lessonId}`
          );
        }

        console.log(data);
      } else {
        console.error("Error uploading video:", response);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="go-back-arr" onClick={goBack}>
        &larr; Go Back
      </p>
      <form className="video-upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="video-input"
          accept="video/mp4"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
      {loading && (
        <div>
          <p>Uploading & Processing the Video, Please Wait...</p>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
