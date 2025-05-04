import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload, FaCalendarAlt } from "react-icons/fa";
import "../AdminDashboard/Foto.css";

const Foto = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-17"));

  // Data foto untuk tanggal tertentu
  const fotoData = {
    "2024-12-17": [
      { id: 1, tanggal: "17-12-2024, 10:30 WIB" },
      { id: 2, tanggal: "17-12-2024, 12:00 WIB" },
      { id: 3, tanggal: "17-12-2024, 15:45 WIB" },
    ],
  };

  // Konversi tanggal ke format yang sesuai
  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <div className="adminfoto-container">
      <h3 className="title">Data Foto Pelanggaran</h3>

      <div className="calendar-container">
        <FaCalendarAlt className="calendar-icon" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy"
          className="date-picker"
        />
      </div>

      <div className="content">
        {fotoData[formatDate(selectedDate)] ? (
          fotoData[formatDate(selectedDate)].map((item) => (
            <div className="foto-card" key={item.id}>
              <div className="foto-placeholder"></div>
              <div className="foto-info">
                <p>{item.tanggal}</p>
                <button className="download-btn">
                  <FaDownload className="icon" />
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Tidak ada foto pada tanggal ini</p>
        )}
      </div>

      {fotoData[formatDate(selectedDate)] && (
        <button className="all-download">Download All</button>
      )}
    </div>
  );
};

export default Foto;
