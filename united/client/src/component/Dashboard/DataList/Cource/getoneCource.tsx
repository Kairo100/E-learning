import  { useEffect, useState } from 'react';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { Accordion } from 'react-bootstrap';
import { Accordion, AccordionSummary, Dialog } from '@mui/material';
// import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Close, Star } from '@mui/icons-material';
import Review from '../../../../Review';

interface UserInfo {
  id: number;
}

interface Lesson {
  title: string;
  videoUrl: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface cource {
  id: number;
  idcource:number;
  imageUrl: string;
  content:string;
  title:string;
  videoUrl: string;
  Section: Section[];
  Enrollment: {
    userId: number;
    Isconfirm: boolean;
  }[];
}

const GetOnlyCourse = () => {
  const navigate=useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, []);
  const[Paymentdailog,setpaymentdailog]=useState(false)
  const handleopenPayment=()=>{
    setpaymentdailog((true))
  }
  const[ShowpreviewVideo,setShowprieviewVideo]=useState(false)

  const handleclosepayment=()=>{
    setpaymentdailog(false)
  }
  const handleclosepreviewVideo=()=>{
    setShowprieviewVideo(false)
  }
  const handlechangepreviewVideo=()=>{
    setShowprieviewVideo(true)
  }
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [cource, setcource] = useState<cource | null>(null);
  const {id}=useParams()

  const userInfoString = localStorage.getItem('userInfo');

  useEffect(() => {
  
    const fetchcources = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get(
            `http://localhost:2000/api/user/get/one/${userInfo.id}`
          );
          setUserId(response.data.id);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchcources();
  }, [userInfoString]);

  useEffect(() => {
    const fetchcource = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/cource/get/one/${id}`);
        setcource(response.data);
      } catch (error) {
        console.error('Error fetching cource details:', error);
      }
    };

    fetchcource();
  }, []);

  if (!cource) {
    return <p>Loading...</p>;
  }

  const enrollment = cource.Enrollment.find((enrollment) => enrollment.userId === userId);
  const enrollmentConfirmed = enrollment && enrollment.Isconfirm;
  const currentSection = cource.Section[currentSectionIndex];
const currentLesson = currentSection?.lessons[currentLessonIndex];

const handleNextLesson = () => {
  if (currentLessonIndex < currentSection?.lessons.length - 1) {
    setCurrentLessonIndex(currentLessonIndex + 1);
    setShowVideo(true);
  } else if (currentSectionIndex < cource.Section.length - 1) {
    setCurrentSectionIndex(currentSectionIndex + 1);
    setCurrentLessonIndex(0);
    setShowVideo(true);
  }
};

const handlePreviousLesson = () => {
  if (currentLessonIndex > 0) {
    setCurrentLessonIndex(currentLessonIndex - 1);
    setShowVideo(true);
  } else if (currentSectionIndex > 0) {
    setCurrentSectionIndex(currentSectionIndex - 1);
    setCurrentLessonIndex(
      cource.Section[currentSectionIndex - 1]?.lessons.length - 1
    );
    setShowVideo(true);
  }
};
const handleLessonClick = (sectionIndex: number, lessonIndex: number) => {
  setCurrentSectionIndex(sectionIndex);
  setCurrentLessonIndex(lessonIndex);
  setShowVideo(true);
};

return (
    <div>
       <div className=" py-[90px]">


{enrollmentConfirmed ? (
<div className="mx-auto px-4 py-8">
<div className="flex flex-col md:flex-row justify-between">
<div className="lessons w-full md:w-1/2">
<div className="flex justify-between items-center mb-4">
 <button
   onClick={handlePreviousLesson}
   disabled={currentLessonIndex === 0 && currentSectionIndex === 0}
   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
 >
   <FiChevronLeft className="mr-2" />
   {/* Previous Lesson */}
 </button>

 <button
   onClick={handleNextLesson}
   disabled={
     currentLessonIndex === currentSection.lessons.length - 1 &&
     currentSectionIndex === cource.Section.length - 1
   }
   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
 >
   {/* Next Lesson */}
   <FiChevronRight className="ml-2" />
 </button>
</div>

{showVideo && currentLesson ? (
 <div className="mt-8">
   <div>
     <video
       className="mb-4 w-full"
       style={{ maxWidth: "700px", maxHeight: "500px" }}
       src={currentLesson.videoUrl}
       controls
     />
   </div>
 </div>
) : (
 <p className="mt-8 md:mt-0 text-center md:text-left text-green-500">
   Congratulations! You have completed the Amazing course!
 </p>
)}

<div className="flex justify-center md:justify-start mt-4">
 {/* Additional content */}
</div>
</div>

<div className="w-full md:w-1/2">
<div className="container mx-auto px-4 py-8">
<div className="w-full md:w-1/2 mt-8">
      {cource.Section.map((section, sectionIndex) => ( 
        <Accordion key={section.title} className="mb-4">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`section-${sectionIndex}-content`}
            id={`section-${sectionIndex}-header`}
          >
            <Typography className="text-xl font-bold">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-disc ml-8">
              {section.lessons.map((lesson, lessonIndex) => (
                <li
                  key={lesson.title}
                  onClick={() => handleLessonClick(sectionIndex, lessonIndex)}
                  className={`cursor-pointer ${
                    currentLessonIndex === lessonIndex && currentSectionIndex === sectionIndex
                      ? "font-semibold text-blue-500"
                      : ""
                  }`}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
</div>
</div>
</div>

<Review />
</div>
) : (
  <div className="container-fluid w-full bg-white mt-16 ">
  <div className="md:flex">
    <div className="md:w-2/3 p-8">
      <h1 className="text-3xl font-bold mb-4">{cource.title}</h1>
      {cource.review.map((review) => (
        <div key={review.Comment} className="flex items-center mb-4">
          <div
            className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mr-4"
            style={{ fontSize: '1.5rem' }}
          >
          
          </div>
          <div>
            <div>{review.Comment}</div>
            <div className="rating flex items-center">
              {[...Array(review.review)].map((_, index) => (
                <span key={index} className="star">
                  <Star />
                </span>
              ))}
              <p className="ml-2">{(review.review / 5) * 100}%</p>
            </div>
          </div>
        </div>
      ))} 
      <h1 className="text-xl font-semibold mb-4">What will you Learn This cource?</h1>
      <p dangerouslySetInnerHTML={{ __html: cource.content }}></p>
      <div className="mt-8 rounded  p-2" >
        <h1 className="text-xl font-semibold">cource Content</h1>
        {cource.Section.map((section, sectionIndex) => (
          <div className='m-4' key={section.title}>
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls={`section-${sectionIndex}-content`}
                // id={`section-${sectionIndex}-header`}
              >
                <Typography>{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lesson.title}
                      onClick={() => {
                        setCurrentSectionIndex(sectionIndex);
                        setCurrentLessonIndex(lessonIndex);
                        setShowVideo(true);
                      }}
                      className={`${
                        currentLessonIndex === lessonIndex &&
                        currentSectionIndex === sectionIndex
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
    <div className="md:w-1/3 p-8">
      <div className="bg-white rounded-md shadow border p-4 flex flex-col items-center">
        <img className="w-64 h-64 object-cover mb-4" onClick={handlechangepreviewVideo}  src={cource.imageUrl} alt="" />
        <button onClick={handleopenPayment}
          className="bg-orange-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Start Learning
        </button>
      </div>
    </div>
  </div>
 
</div>
  
)}
{/* <review/> */}
 <Dialog open={ShowpreviewVideo} onClose={handleclosepreviewVideo} >
 {/* <ReactPlayer controls > */}
<div className="flex justify-between px-8 mb-[70px]">
<p>Introduction Of this Cource</p>
<p onClick={handleclosepreviewVideo} style={{cursor:'pointer'}}><Close/></p>
</div>
<video  className="w-[320px] h-[320px]" controls src={cource.videoUrl}></video>

{/* </ReactPlayer> */}
</Dialog> 
<Dialog open={Paymentdailog} onClose={handleclosepayment} className="fixed  inset-0 z-10 overflow-y-auto">
<div className="flex items-center justify-center min-h-10 text-center">
  
  <div className="relative bg-white rounded-lg max-w-sm mx-auto p-8">

    <div className="space-y-4">
      <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Zaad
      </button>

      <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        E_Dahab
      </button>

      <Link
        to={`enrollment/new/${cource.courceId}`}
        className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Mastercard
      </Link>
    </div>
  </div>
</div>

</Dialog>
</div>
    </div>
  );
};

export default GetOnlyCourse;