import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/IsiPelanggaran.css";

const dataPelanggaranMingguan = [
  { name: "Memakai Helm", value: 220, color: "#00b4d8" },
  { name: "Tidak Memakai Helm", value: 280, color: "#777" }
];

const dataPelanggaranBulanan = [
  { name: "JAN", pelanggaran: 150, kendaraan: 400 },
  { name: "FEB", pelanggaran: 200, kendaraan: 500 },
  { name: "MAR", pelanggaran: 250, kendaraan: 550 },
  { name: "APR", pelanggaran: 300, kendaraan: 600 },
  { name: "MEI", pelanggaran: 280, kendaraan: 580 },
  { name: "JUN", pelanggaran: 270, kendaraan: 560 }
];

const totalKendaraan = dataPelanggaranMingguan.reduce((sum, entry) => sum + entry.value, 0);

const IsiPelanggaran = () => {
  return (
    <div className="pelanggaran-container">
      <h2 className="judul">Data Statistik Jumlah Pelanggaran</h2>

      {/* Statistik Minggu Ini */}
      <div className="card">
        <h3 className="card-title">Statistik Minggu Ini</h3>
        <div className="card-body">
          <p>KENDARAAN MASUK</p>
          <h3>{totalKendaraan}</h3>
        </div>
        <div className="chart-content">
          <PieChart width={400} height={400}>
            <Pie data={dataPelanggaranMingguan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {dataPelanggaranMingguan.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="legend-container">
            {dataPelanggaranMingguan.map((entry, index) => (
              <div key={index} className="legend-box" style={{ backgroundColor: entry.color }}>
                {entry.name} <br /> {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistik 6 Bulan Terakhir */}
      <div className="card">
        <h3 className="card-title">Data Statistik Jumlah Pelanggaran 6 Bulan Terakhir</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataPelanggaranBulanan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pelanggaran" fill="#00b4d8" name="Pelanggaran Helm" />
            <Bar dataKey="kendaraan" fill="#777" name="Jumlah Kendaraan Masuk" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IsiPelanggaran;
