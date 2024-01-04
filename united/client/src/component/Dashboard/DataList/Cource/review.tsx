import axios from 'axios';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
const colors ={
    orage:"blue",
    gray:"#red"
}
const Review = () => {
    const starts = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [feedback, setFeedback] = useState('');
  
    const handleClick = (value:any) => {
      setCurrentValue(value);
    };
  
    const handleMouseEnter = (value:any) => {
      setHoverValue(value);
    };
  
    const handleMouseLeave = () => {
      setHoverValue(undefined);
    };
  
    const handleTextareaChange = (event:any) => {
      setFeedback(event.target.value);
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/review/new', {
            // alert("ll"),
          rating: currentValue,
          comment: feedback,
        });
        console.log('Review submitted successfully:', response.data);
        // Reset the form
        setCurrentValue(0);
        setHoverValue(undefined);
        setFeedback('');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="stars">
          {starts.map((_, index) => (
            <FaStar
              key={index}
        
              color={(hoverValue || currentValue) > index ?colors.orage : colors.gray}
              onClick={() => handleClick(index + 1)}
              onMouseEnter={() => handleMouseEnter(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
        <textarea placeholder="What is your feedback" value={feedback} onChange={handleTextareaChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };
  export default Review