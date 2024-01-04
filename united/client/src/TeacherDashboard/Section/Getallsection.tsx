import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getallsectionFn } from '../../redux/Slices/Dashboard/Section/getallsection';
import axios from 'axios';
interface UserInfo{
  id:Number;
}
const Getallsection: React.FC = () => {
  const getallsections = useSelector((state: RootState) => state.getallsetion);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userInfoString=localStorage.getItem('userInfo')
    if(userInfoString){
      const userInfo:UserInfo=JSON.parse(userInfoString)
      try {
        
      } catch (error) {
        
      }
    }
// const res=axios.get('')
  }, [dispatch]);

  const keys = [
    'Id',
    'Section Title',
    'Section Description',
    'Section CourceId',
  ];

  return (
    <div className="container mx-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {keys.map((datakeys) => (
              <th
                key={datakeys}
                className="py-2 px-4 border-b border-gray-300 bg-gray-100"
              >
                {datakeys}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getallsections.data.map((section) => (
            <tr key={section.id} className="border-b border-gray-300">
              {/* <td className="py-2 px-4">{section.id}</td> */}
              <td className="py-2 px-4">{section.title}</td>
              <td className="py-2 px-4">{section.description}</td>
              <td className="py-2 px-4">{section.courseId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Getallsection;