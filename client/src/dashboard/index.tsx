import "../App.css";
import { FaBars } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import { MdOutlineDashboard } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import Dashboard from "../components/Dashbord";
import Add from "../components/Add";
import Update from "../components/Update";
import Delete from "../components/Delete";
import AboutUs from "../components/About";



function Dashbaord() {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "add":
        return <Add />;
      case "update":
        return <Update />;
      case "delete":
        return <Delete />;
      case "about":
        return <AboutUs />;
      default:
        return null;
    }
  };
  return (
    <>
      <h1 className="mb-4 heading">Contract Management System</h1>
      <div className="dashboard-box">
        <div className="dashboard-header">
          <div className="d-flex align-items-center justify-content-between management-box">
            <div className="d-flex align-items-center justify-content-between">
              {" "}
              <FaBars />
              <h5 className="m-0">Contract Management System</h5>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="m-0">logged in as user</p>
              <FaRegUserCircle />
            </div>
          </div>
        </div>
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <div className="p-2 side-bar-menu">
            <ul className="p-0">
              <li onClick={() => setCurrentView("dashboard")}>
                <MdOutlineDashboard /> <p className="m-0">Dashboard</p>
              </li>
              <li onClick={() => setCurrentView("add")}>
                <IoAddCircleOutline />
                <p className="m-0 pt-1 cursor-pointer">ADD</p>
              </li>
              <li onClick={() => setCurrentView("update")}>
                <GrUpdate />
                <p className="m-0 pt-1 ">UPDATE</p>
              </li>
              <li onClick={() => setCurrentView("delete")}>
                <RiDeleteBin5Fill />
                <p className="m-0 pt-1 ">DELETE</p>
              </li>
              <li onClick={() => setCurrentView("about")}>
                <IoInformationCircleOutline />
                <p className="m-0 pt-1 ">ABOUT US</p>
              </li>
            </ul>
          </div>
          <div className="p-2">
            <div className="main-content">{renderView()}</div>

            {/* <div>
              <p className="m-0 text-danger">Contracts</p>
              <div>
                <input type="text" placeholder="Search..." />
                <IoMdSearch />
              </div>
            </div> */}
          </div>
        </Stack>
      </div>
    </>
  );
}

export default Dashbaord;
