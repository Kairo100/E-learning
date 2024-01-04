import { Outlet } from "react-router-dom";
import CreateCoursePage from "../Cource/CreateCource";
import TeacherDashboardCourse from "../Cource/getallcourcesteacher";
import Getallcourcesteacher from "../Cource/getallcourcesteacher";
import Navbar from "../Sidebar/Navbar";
import Sidebar from "../Sidebars/Sidebar";
import './Main.css'
const Home = () => {
  return (
    <div className="home bg-white">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets  m-4">
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <Outlet/>
      </div>
      
    </div>
  );
};

export default Home;