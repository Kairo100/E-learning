import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const CourseDetailAll: React.FC = () => {
  const [course, setCourse] = useState<any | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/cource/get/one/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  const enrollmentCount = course.Enrollment.length;

  return (
    <div className="container-fluid rounded-md my-8 mx-8">
      <div>
        <div className="w-25 container shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-auto px-4 py-8">
          <div>
            <ul className="">
              {course.Section.map((section: any) => (
                <li key={section.title}>
                  <ul className="space-y-2">
                    <span className="flex gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                      Section title
                      <h1>{section.title}</h1>
                    </span>
                    {section.lessons.map((lesson: any) => (
                      <li key={lesson.title}>
                        <div className="block ">
                          <div className="flex justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <p className="text-lg font-bold mb-2">
                              Video Lesson:
                            </p>
                            <video
                              src={lesson.videoUrl}
                              style={{
                                minWidth: "190px",
                                maxWidth: "190px",
                                minHeight: "210px",
                                maxHeight: "210px",
                                borderRadius: "4px",
                              }}
                              controls
                              className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                            />
                          </div>
                          <span className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-5">
                            <p className="font-bold">Title lesson:</p>
                            <p className="">{lesson.title}</p>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Enrollment</h2>
            <p>Total Enrollments: {enrollmentCount}</p>
            <ul className="space-y-4">
              {course.Enrollment.map((enrollment: any) => (
                <li
                  key={enrollment.id}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-lg font-medium">
                      {enrollment.studentName}
                    </p>
                    <p className="text-gray-600">
                      {dayjs(enrollment.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailAll;