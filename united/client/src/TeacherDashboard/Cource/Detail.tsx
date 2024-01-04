import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface Lesson {
  title: string;
  videoUrl: string;
}

interface Section {
  title: string;
  courseId: number;
  lessons: Lesson[];
}

interface Course {
  courceId: number;
  Name: string | null;
  Shortdescription: string;
  content: string;
  title: string;
  price: string;
  imageUrl: string;
  isDeleted: boolean;
  videoUrl: string;
  id: number;
  isPublished: boolean;
  createdAt: string;
  UpadatedAt: string;
  CategoryId: number;
  Section: Section[];
  Enrollment: any[];
  review: any[];
  quiz: any[];
}

const DetailcourceTeacher: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course>(`http://localhost:2000/api/cource/get/one/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div className='p-4'>
      {course !== null && (
        <div>
          {course.Section.map((section, index) => (
            <div key={index} className="mb-6">
              {/* <h3 className="text-xl font-bold mb-2">{section.title}</h3> */}
              {section.lessons.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    >
                      <h4 className="text-lg font-bold mb-2">{lesson.title}</h4>
                      <div className="flex flex-col items-center">
                        <video src={lesson.videoUrl} controls className="w-32 h-auto mb-2"></video>
                        <Link
                          to={`lesson/${lesson.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No lessons found.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailcourceTeacher;