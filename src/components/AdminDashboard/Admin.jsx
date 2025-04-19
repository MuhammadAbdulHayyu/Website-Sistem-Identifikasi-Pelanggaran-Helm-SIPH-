import React from "react";
import "../AdminDashboard/Admin.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataPelanggaranMingguan = [
  { name: "Memakai Helm", value: 220, color: "#00b4d8" },
  { name: "Tidak Memakai Helm", value: 280, color: "#777" }
];

const dataBar = [
  { name: "JAN", pelanggaran: 100, kendaraan: 200 },
  { name: "FEB", pelanggaran: 200, kendaraan: 300 },
  { name: "MAR", pelanggaran: 250, kendaraan: 350 },
  { name: "APR", pelanggaran: 300, kendaraan: 400 },
  { name: "MAY", pelanggaran: 350, kendaraan: 450 },
  { name: "JUN", pelanggaran: 400, kendaraan: 500 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Live Stream */}
        <div className="livestream">
          <div className="video-box">
            <p className="live-text">LIVE</p>
          </div>
        </div>

        {/* Statistik & Pengaduan */}
        <div className="dashboard-widgets">
          {/* Statistik */}
          <div className="widget">
            <h3>Statistik</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dataPelanggaranMingguan} dataKey="value" outerRadius={80}>
                  {dataPelanggaranMingguan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p><strong>Memakai Helm:</strong> {dataPelanggaranMingguan[0].value}</p>
            <p><strong>Pelanggaran Helm:</strong> {dataPelanggaranMingguan[1].value}</p>
          </div>

          {/* Pengaduan */}
          <div className="table-container">
            <h3>Pengaduan</h3>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Checklist</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }, (_, i) => (
                  <tr key={i}>
                    <td>anonymous {i + 1}</td>
                    <td>12-01-2024</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik Bar */}
        <div className="chart-container">
          <h3>Statistik Pelanggaran Helm</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pelanggaran" fill="#8884d8" name="Pelanggaran Helm" />
              <Bar dataKey="kendaraan" fill="#82ca9d" name="Jumlah Kendaraan Masuk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
