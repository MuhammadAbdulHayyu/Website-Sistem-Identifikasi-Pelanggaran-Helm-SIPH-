import React, { useState, useEffect } from "react";
import "../AdminDashboard/Admin.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [pengaduan, setPengaduan] = useState([]);
  const [dataPelanggaranMingguan, setDataPelanggaranMingguan] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [showKalender, setShowKalender] = useState(false);
  const [tahunBarChart, setTahunBarChart] = useState("");

  useEffect(() => {
    fetchPengaduan();
  }, []);

  useEffect(() => {
    fetchStatistik();
  }, [filterTahun, filterBulan, filterTanggal, tahunBarChart]);

  const fetchPengaduan = async () => {
    const pengaduanCollection = collection(db, "pengaduan");
    const snapshot = await getDocs(pengaduanCollection);
    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((item) => item.timestamp)
      .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
    setPengaduan(data.slice(0, 5));
  };

  const fetchStatistik = async () => {
    const motorCollection = collection(db, "jumlah_motor");
    const snapshot = await getDocs(motorCollection);

    let totalMotor = 0;
    let totalPelanggaran = 0;

    const bulanMap = {
      "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MEI", "06": "JUN",
      "07": "JUL", "08": "AGU", "09": "SEP", "10": "OKT", "11": "NOV", "12": "DES",
    };

    const monthlyData = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const tanggal = data.waktu_mulai?.split("_")[0]; // yyyy-mm-dd
      if (!tanggal) return;

      const [tahun, bulan] = tanggal.split("-");
      const bulanStr = bulanMap[bulan] || "UNKNOWN";
      const label = `${bulanStr} ${tahun}`;

      let include = false;
      if (filterTanggal) {
        include = tanggal === filterTanggal;
      } else if (filterTahun && filterBulan) {
        include = tahun === filterTahun && bulan === filterBulan;
      } else if (filterTahun) {
        include = tahun === filterTahun;
      } else {
        include = true;
      }

      if (include) {
        totalMotor += data.jumlah_motor || 0;
        totalPelanggaran += data.jumlah_pelanggaran || 0;
      }

      if (!monthlyData[label]) {
        monthlyData[label] = {
          name: label,
          pelanggaran: 0,
          kendaraan: 0,
          tahun,
        };
      }

      monthlyData[label].pelanggaran += data.jumlah_pelanggaran || 0;
      monthlyData[label].kendaraan += data.jumlah_motor || 0;
    });

    setDataPelanggaranMingguan([
      { name: "Memakai Helm", value: totalMotor - totalPelanggaran, color: "#00b4d8" },
      { name: "Tidak Memakai Helm", value: totalPelanggaran, color: "#777" },
    ]);

    const filteredBar = Object.values(monthlyData).filter(d => !tahunBarChart || d.tahun === tahunBarChart);
    const sortedData = filteredBar.sort((a, b) => {
      const urutanBulan = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
      const [bulanA, tahunA] = a.name.split(" ");
      const [bulanB, tahunB] = b.name.split(" ");
      const indexA = urutanBulan.indexOf(bulanA) + parseInt(tahunA) * 12;
      const indexB = urutanBulan.indexOf(bulanB) + parseInt(tahunB) * 12;
      return indexA - indexB;
    });

    setDataBar(sortedData.slice(-6));
  };

  const formatWaktu = (timestamp) => {
    if (!timestamp?.toDate) return "Waktu tidak tersedia";
    return timestamp.toDate().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const YouTubeLive = () => {
    const channelId = "UCmgz9mlNXUXw44-F8zWYDew";
    return (
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
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
          <YouTubeLive />
        </div>

        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Data Statistik</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
              <select onChange={(e) => setFilterTahun(e.target.value)} value={filterTahun} disabled={filterTanggal}>
                <option value="">Tahun</option>
                <option value="2025">2025</option>
              </select>

              <select onChange={(e) => setFilterBulan(e.target.value)} value={filterBulan} disabled={filterTanggal}>
                <option value="">Bulan</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>

              <button onClick={() => {
                setFilterTahun("");
                setFilterBulan("");
                setFilterTanggal("");
              }}>Total</button>

              <button
  onClick={() => {
    if (showKalender) {
      // Saat tutup perhari diklik, kosongkan tanggal & aktifkan tahun/bulan
      setFilterTanggal("");
    }
    setShowKalender(!showKalender);
  }}
>
  {showKalender ? "Tutup Perhari" : "Lihat Perhari"}
</button>


              {showKalender && (
                <input
                  type="date"
                  value={filterTanggal}
                  onChange={(e) => {
                    setFilterTanggal(e.target.value);
                    setFilterTahun("");
                    setFilterBulan("");
                  }}
                />
              )}
            </div>

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
            <p><strong>Memakai Helm:</strong> {dataPelanggaranMingguan[0]?.value || 0}</p>
            <p><strong>Pelanggaran Helm:</strong> {dataPelanggaranMingguan[1]?.value || 0}</p>
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
                {pengaduan.map((item) => (
                  <tr key={item.id}>
                    <td>{item.judulPengaduan}</td>
                    <td>{formatWaktu(item.timestamp)}</td>
                    <td>
                      <span className={`status-option ${
                        item.status === "Diproses"
                          ? "status-diproses"
                          : item.status === "Selesai"
                          ? "status-selesai"
                          : "status-belum"
                      }`}>
                        {item.status || "Belum Diproses"}
                      </span>
                    </td>
                  </tr>
                ))}
                {pengaduan.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Belum ada data pengaduan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="chart-container">
          <h3>Data Statistik Pelanggaran Helm</h3>
          <div style={{ marginBottom: "10px" }}>
            <select onChange={(e) => setTahunBarChart(e.target.value)} value={tahunBarChart}>
              <option value="">Semua Tahun</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBar}>
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
    </div>
  );
};

export default Dashboard;
