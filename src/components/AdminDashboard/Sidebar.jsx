import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaDatabase, FaExclamationCircle, FaChevronDown } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">SIPH</h2>
      <ul className="sidebar-menu">
        {/* Dashboard */}
        <li>
          <NavLink to="/Dashboard" exact activeClassName="active">
            <FaHome className="icon" />
            Dashboard
          </NavLink>
        </li>

        {/* Data Pelanggaran - Accordion */}
        <li onClick={() => setIsAccordionOpen(!isAccordionOpen)} className="accordion">
          <FaDatabase className="icon" />
          Data Pelanggaran
          <FaChevronDown className={`arrow-icon ${isAccordionOpen ? "open" : ""}`} />
        </li>

        {isAccordionOpen && (
          <ul className="submenu">
            <li>
              <NavLink to="/DataFoto" activeClassName="active">
                Data Foto
              </NavLink>
            </li>
            <li>
              <NavLink to="/DataVideo" activeClassName="active">
                Data Video
              </NavLink>
            </li>
          </ul>
        )}

        {/* Pengaduan */}
        <li>
          <NavLink to="/DataPengaduan" activeClassName="active">
            <FaExclamationCircle className="icon" />
            Pengaduan
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
