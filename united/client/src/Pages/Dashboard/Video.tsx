import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Videos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('/upload', formData);
      const { success, video } = response.data;

      if (success && video && video.filename) {
        setVideoUrl(`/uploads/${video.filename}`);
      }
    } catch (error) {
      console.error('Failed to upload the video:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {videoUrl && <ReactPlayer url={videoUrl} controls />}
    </div>
  );
};

export default Videos;