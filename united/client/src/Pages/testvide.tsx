import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [teacherId, setTeacherId] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!video) {
      alert('No video file selected');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('Name', name);
    formData.append('price', price);
    formData.append('CategoryId', categoryId);
    formData.append('TeacherId', teacherId);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Video uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to upload video');
    }
  };

  return (
    <div>
      <h1>Video Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Video:
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Category ID:
            <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Teacher ID:
            <input type="number" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default App;