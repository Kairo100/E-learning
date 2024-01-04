// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// interface Category {
//   catId: number;
//   catName: string;
// }

// export const DropdownComponent: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/category/all');
//       setCategories(response.data.result);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const categoryId = parseInt(e.target.value);
//     setSelectedCategoryId(categoryId);
//   };

//   return (
//     <div>
//       <select id="category" value={selectedCategoryId || ''} onChange={handleCategoryChange}>
//         <option value="">Select</option>
//         {categories.map((category) => (
//           <option key={category.catId} value={category.catId}>
//          <Link to={`/category/${selectedCategoryId}`}>{categories.find(cat => cat.catId === selectedCategoryId)?.catName}</Link>
//           </option>
//         ))}
//       </select>

//       {selectedCategoryId && (
//         <div>
         
//         </div>
//       )}
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Category {
  catId: number;
  catName: string;
  catDescription: string;
  catImage: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  Cource: any[]; // Adjust the type according to your data structure
}

export const DropdownComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/all');
      setCategories(response.data.result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div>
      {/* <h1>Categories</h1> */}
      {categories.map((category) => (
        <div key={category.catId}>
          <h2>
            <Link to={`/category/${category.catId}`}>{category.catName}</Link>
          </h2>
    
        </div>
      ))}
    </div>
  );
};

