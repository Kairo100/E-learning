import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const colors = {
  orange: '#FFB500',
  gray: '#A9A9A9',
};

interface UserInfo {
  id: number;
  givenName: string;
}

interface ReviewData {
  Comment: string;
  Name: string;
  review: number;
  CourceId: number | null;
  UserId: number | null;
}

const Review = () => {
  const [hoverValue, setHoverValue] = useState<number>(Number);
  const [currentValue, setCurrentValue] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [courceId, setCourceId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const stars = Array(5).fill(0);
  const userInfoString = localStorage.getItem('userInfo');
  const { id } = useParams();

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseEnter = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const data: ReviewData = {
      Comment: comment,
      Name: name,
      review: currentValue,
      CourceId: courceId,
      UserId: userId,
    };

    try {
      const response = await axios.post('http://localhost:2000/api/review/new', data);
      setComment('')
      setName('')
      setCurrentValue(0)
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get(`http://localhost:2000/api/user/get/one/${userInfo.id}`);
          setUserId(response.data.id);
          setName(response.data.givenName);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchCourses();
  }, [userInfoString]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/cource/get/one/${id}`);
        setCourceId(response.data.courceId);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const renderLegend = () => {
    let legendText = '';
    switch (hoverValue || currentValue) {
     
    }
    return <div className="text-gray-500 mt-2">{legendText}</div>;
  };

  return (
<div className="border flex flex-col items-center">
  <div className="flex justify-center space-x-2">
    {stars.map((_, index) => (
      <FaStar
        color={index < hoverValue || index < currentValue ? colors.orange : colors.gray}
        key={index}
        size={24}
        onClick={() => handleClick(index + 1)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      />
    ))}
  </div>
  {renderLegend()}
  <textarea
    className="mt-4 p-2 border border-gray-300 rounded"
    placeholder="Leave your feedback"
    value={comment}
    onChange={handleTextareaChange}
  />
  <input style={{ fontSize: '0px' }} type="text" readOnly value={name} />
  <button
    className="mt-4 w-[190px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    onClick={handleSubmit}
  >
    Submit
  </button>
</div>
  );
};

export default Review;

// kani waa diwaangalinta booking
// const createbooking=async (req, res) => {
//   const { roomId, checkInDate, checkOutDate } = req.body;

//   try {
//     if(checkInDate >=checkOutDate)=>{
//       return res.json("please choose valid date")
//     }
//     const booking = await Booking.create({
//       data: {
//         checkInDate,
//         checkOutDate,
//         room: { connect: { R_id: roomId } },
//       },
//     });

//     // Update the room's availability
//     await Room.update({
//       where: { R_id: roomId },
//       data: { isAvailable: false },
//     });

//     res.status(201).json({ message: 'Booking made successfully.' });
//   } catch (error) {
//     console.error('Error making booking:', error);
//     res.status(500).json({ error: 'An error occurred while making the booking.' });
//   }
// });