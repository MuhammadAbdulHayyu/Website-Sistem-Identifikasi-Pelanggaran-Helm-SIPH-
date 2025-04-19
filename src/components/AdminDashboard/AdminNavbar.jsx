import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const handleLogout = () => {
    alert("Anda telah logout!");
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <h1 className="admin-navbar-title">DASHBOARD</h1>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
