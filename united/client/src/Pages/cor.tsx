import React, { useState } from 'react';
import axios from 'axios';

function Re() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [Name, setName] = useState('');
  const [Description,setDescription]=useState('')
  const [price,setprice]=useState('')
const [TeacherId,setTeacherId]=useState('')
const[CategoryId,setCategoryId]=useState('')
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('Name', Name);
    formData.append('price', price);
    formData.append('TeacherId', TeacherId);
    formData.append('CategoryId',CategoryId );
    

    try {
      const response = await axios.post('http://localhost:5000/api/cor/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // video URL from the server
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="Name">Name:</label>
          <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} />
        </div>
      <div>
          <label htmlFor="Name">price:</label>
          <input type="text" id="Name" value={price} onChange={(e) => setprice(e.target.value)} />
        </div>
      <div>
          <label htmlFor="Name">TeacherId:</label>
          <input type="text" id="Name" value={TeacherId} onChange={(e) => setTeacherId(e.target.value)} />
        </div>
      <div>
          <label htmlFor="Name">CategoryId:</label>
          <input type="text" id="Name" value={CategoryId} onChange={(e) =>setCategoryId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea id="Description" value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Re;