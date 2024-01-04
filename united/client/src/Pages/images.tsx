import React, { useState } from 'react';
import axios from 'axios';

const Images = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        await axios.post('http://localhost:5000/api/img/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Image uploaded successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && (
        <div>
          <h2>Selected Image:</h2>
          <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '300px' }} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Images;