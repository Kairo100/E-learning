// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// interface UserData {
//   givenName: string;
//   email: string;
//   password: string;
//   username: string;
//   isAdmin: boolean;
// }

// const Chart: React.FC = () => {
//   const [userData, setUserData] = useState<UserData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user/get/all');
//         setUserData(response.data.result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>User Data Chart</h1>
//       <LineChart width={600} height={400} data={userData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="givenName" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="isAdmin" stroke="#8884d8" />
//       </LineChart>
//     </div>
//   );
// };

// export default Chart;
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LineChartFuLL = () => {
    const[charydate,setchartdata]=useState([])
    useEffect(()=>{
        const fetchData = async()=>{
const {data}=await axios.get('http://localhost:5000/api/category/all')
console.log(data)
        }
        fetchData()
    },[])
  return (
    <div>FuLL</div>
  )
}

export default LineChartFuLL