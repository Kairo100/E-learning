

import {PiUsersThreeDuotone,PiChalkboardTeacherLight} from 'react-icons/pi'
import {VscGitPullRequestGoToChanges} from 'react-icons/vsc'
import {BiSolidReport} from 'react-icons/bi'
const Charts = () => {
  return (
    <div className=' container flex justify-center items-center flex-col bg-[#f5f5fb] mt-[4rem] w-[100%] h-[100%] '>
      {/* qaybta 1aad */}
      <div className=' dashresOne bg-white lg:w-[90%] lg:h-[40%]  h-[20%] rounded-xl flex items-center justify-around  '>
       <div className="text-xl ml-5 ">
        <h1 className="text-[#F98393] font-bold">kusoo dhawow Dashboardka</h1>
        <p className="text-[#aca4a4]">complete following steps</p>
       </div> 
       <div className='shadow-xl dashresTwo flex flex-col justify-center  w-[30%]  h-[60%]
       bg-[#f98393]  rounded-md'>
         <div className="flex justify-between ml-3  ">
          <h1 className="text-white text-xl font-bold">Certification</h1>
          <button className="mr-2 bg-white px-1 py-1 rounded-md">GO</button>
         </div>
          <p className=" ml-3 text-[#e4e1e1]">see quality certificate</p>
       </div>
       {/* another bottom */}
       <div className='shadow-xl dashresTwo flex flex-col justify-center  w-[30%]  h-[60%]
        bg-[#74a1f8]  rounded-md'>
         <div className="flex justify-between ml-3  ">
          <h1 className="text-white text-xl font-bold">Good Prents</h1>
          <button className="mr-2 bg-white px-1 py-1 rounded-md">GO</button>
         </div>
          <p className=" ml-3 text-[#e4e1e1]">Good behaviour</p>
       </div>
      </div>

       {/* qeybta 2aad */}


      <div className="mt-8 w-[100%] bg-white h-[80%] rounded-lg ">
         <div className="flex boxRese gap-5">
          <div className=" items-center  boxRes bg-[#ffe9ed] w-[20%] h-[20vh] m-5   rounded-xl ">
            <p className="mr-3 ml-3 mt-4 text-[#676363]">See counter users</p>
           <div className="flex justify-between items-center mr-3 ml-3 mt-5">
           <div className="text-2xl  ">
             <p className="text-[#000000]">
             Users
             </p>
              <p className="font-bold text-xl">
                1,000
              </p>
            </div>
            <div className=" flex text-4xl font-bold text-white rounded-full w-[3.5rem] h-[3.5rem] bg-[#ff3d67] justify-center 
             items-center ">
              <span><PiUsersThreeDuotone/></span>
            </div>
           </div>
          </div>
          <div className=" items-center  boxRes bg-[#e4eeff] w-[20%] h-[20vh] m-5   rounded-xl ">
            <p className="mr-3 ml-3 mt-4 text-[#676363]">See counter Teachers</p>
           <div className="flex justify-between items-center mr-3 ml-3 mt-5">
           <div className="text-2xl  ">
             <p className="text-[#000000]">
             Teachers
             </p>
              <p className="font-bold text-xl">
                6,000
              </p>
            </div>
            <div className=" flex text-4xl font-bold text-white rounded-full w-[3.5rem] h-[3.5rem] bg-[#3b88ff] justify-center 
             items-center ">
              <span><PiChalkboardTeacherLight/></span>
            </div>
           </div>
          </div>
          <div className=" items-center boxRes  bg-[#eee5ff] w-[20%] h-[20vh] m-5   rounded-xl ">
            <p className="mr-3 ml-3 mt-4 text-[#676363]">See counter Requests</p>
           <div className="flex justify-between items-center mr-3 ml-3 mt-5">
           <div className="text-2xl  ">
             <p className="text-[#000000]">
             Requests
             </p>
              <p className="font-bold text-xl">
                30,000
              </p>
            </div>
            <div className=" flex text-4xl font-bold text-white rounded-full w-[3.5rem] h-[3.5rem] bg-[#752fdd] justify-center 
             items-center ">
              <span><VscGitPullRequestGoToChanges/></span>
            </div>
           </div>
          </div>
          <div className=" items-center  boxRes bg-[#d7f0e2] w-[20%] h-[20vh] m-5   rounded-xl ">
            <p className="mr-3 ml-3 mt-4 text-[#676363]">See counter Reports</p>
           <div className="flex justify-between items-center mr-3 ml-3 mt-5">
           <div className="text-2xl  ">
             <p className="text-[#000000]">
             Reports
             </p>
              <p className="font-bold text-xl">
                100,000
              </p>
            </div>
            <div className=" flex text-4xl font-bold text-white rounded-full w-[3.5rem] h-[3.5rem] bg-[#45cc7e] justify-center 
             items-center ">
              <span><BiSolidReport/></span>
            </div>
           </div>
          </div>
          <div></div>
          <div></div>
         </div>
      </div>
      
      <div>

      </div>

    </div>
  )
}

export default Charts