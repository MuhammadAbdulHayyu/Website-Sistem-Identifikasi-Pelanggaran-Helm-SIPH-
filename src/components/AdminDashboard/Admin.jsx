// admin.jsx
import React, { useState, useEffect } from "react";
import "../AdminDashboard/Admin.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


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
  const [pengaduan, setPengaduan] = useState([]);

  useEffect(() => {
    const fetchPengaduan = async () => {
      const pengaduanCollection = collection(db, 'pengaduan');
      const snapshot = await getDocs(pengaduanCollection);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPengaduan(data);
    };

    fetchPengaduan();
  }, []);

  const formatWaktu = (timestamp) => {
    if (!timestamp?.toDate) return 'Waktu tidak tersedia';
    return timestamp.toDate().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const YouTubeLive = () => {
    const videoId = 'NXnHKOhZmfU';
    return (
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Live Stream"
          className="video-iframe"
        />
      </div>
    );
  };
  

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
       
          <div className="video-box">
            <p className="live-text"></p>
            <YouTubeLive /> 
          </div>
       

        {/* Statistik & Pengaduan */}
        <div className="dashboard-widgets">
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

          <div className="table-container">
            <h3>Pengaduan</h3>
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Waktu</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pengaduan.slice(0, 8).map((item) => (
                  <tr key={item.id}>
                    <td>{item.judulPengaduan}</td>
                    <td>{formatWaktu(item.timestamp)}</td>
                    <td>{item.status || 'Belum Diproses'}</td>
                  </tr>
                ))}
                {pengaduan.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center' }}>Belum ada data pengaduan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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
