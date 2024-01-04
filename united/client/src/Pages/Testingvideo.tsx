import React, { useState } from 'react';
import axios from 'axios';

const H: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [Name,setName]=useState('')
  const [price,setprice]=useState('')
const [TeacherId,setTeacherId]=useState('')
const[CategoryId,setCategoryId]=useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/api/cor/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setUploadedVideoUrl(response.data.videoUrl);
      } catch (error) {
        console.error('Failed to upload video:', error);
      }
    }
  };

  return (
    <div>
      <h1>Video Upload</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <input type="text" value={Name} onChange={(e)=>setName(e.target.value)}/>
      <input type="number" value={price} onChange={(e)=>setprice(e.target.value)}/>
      <input type="number" value={TeacherId} onChange={(e)=>setTeacherId(e.target.value)}/>
      <input type="number" value={CategoryId} onChange={(e)=>setCategoryId(e.target.value)}/>
      <button onClick={handleUpload}>Upload</button>
      {uploadedVideoUrl && (
        <video controls>
          <source src={uploadedVideoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default H;