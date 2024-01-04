import React from 'react';
import axios from 'axios';

interface Props {
  catId: number;
  onDelete: () => void;
}

const DeleteData: React.FC<Props> = ({ catId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/category/delete/${catId}`);
      onDelete(); // Notify parent component to update the UI or perform additional actions
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Delete Data</h3>
      <p>Cat ID: {catId}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteData;