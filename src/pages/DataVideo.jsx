import React from "react";
import "../styles/Dashboard.css";
import AdminVideo from "../components/AdminDashboard/Video";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

function DataVideo() {
    return (
      <div className="dashboard-wrapper">
        <AdminNavbar />
        <div className="dashboard-container">
          <Sidebar />
          <div className="main-content">
            <AdminVideo />
          </div>
        </div>
      </div>
    );
  }
  
  export default DataVideo;
