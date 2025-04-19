import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './AdminPengaduan.css';

const AdminDashboard = () => {
  const [pengaduan, setPengaduan] = useState([]);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [filterStatus, setFilterStatus] = useState(''); // untuk filter radio

  const fetchPengaduan = async () => {
    const pengaduanCollection = collection(db, 'pengaduan');
    const snapshot = await getDocs(pengaduanCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPengaduan(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus pengaduan ini?');
    if (!confirm) return;
    await deleteDoc(doc(db, 'pengaduan', id));
    fetchPengaduan();
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'pengaduan', id), { status });
  
    // Update state utama
    fetchPengaduan();
  
    // Update state detail yang sedang dilihat
    setSelectedPengaduan((prev) => ({
      ...prev,
      status: status,
    }));
  };

  useEffect(() => {
    fetchPengaduan();
  }, []);

  const formatWaktu = (timestamp) => {
    if (!timestamp?.toDate) return 'Waktu tidak tersedia';
    return timestamp.toDate().toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPengaduan = filterStatus
    ? pengaduan.filter(p => p.status === filterStatus)
    : pengaduan;

  if (selectedPengaduan) {
    return (
      <div className="detail-container">
        <button className="back-button" onClick={() => setSelectedPengaduan(null)}>←</button>
        <div className="judul">{selectedPengaduan.judulPengaduan}</div>
        <div className="deskripsi">{selectedPengaduan.deskripsiAduan}</div>
        <img className="foto-aduan" src={selectedPengaduan.buktiGambar} alt="Bukti" />
        <div className="waktu">Waktu: {formatWaktu(selectedPengaduan.timestamp)}</div>

        <div className="status-container">
  {['Belum Diproses', 'Diproses', 'Selesai'].map((status) => (
    <label key={status} className={`status-option ${selectedPengaduan.status === status ? 'selected' : ''}`}>
      <input
        type="radio"
        checked={selectedPengaduan.status === status}
        onChange={() => handleStatusChange(selectedPengaduan.id, status)}
        style={{ display: 'none' }}
      />
      {status}
    </label>
  ))}
</div>

        <button className="delete-button" onClick={() => handleDelete(selectedPengaduan.id)}>🗑️ Hapus</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Dashboard Pengaduan</h2>

      {/* Filter Radio */}
      <div className="status-filter">
        {['Belum Diproses', 'Diproses', 'Selesai'].map((status) => (
          <label key={status}>
            <input
              type="radio"
              name="statusFilter"
              value={status}
              checked={filterStatus === status}
              onChange={() => setFilterStatus(status)}
            />
            {status}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="statusFilter"
            value=""
            checked={filterStatus === ''}
            onChange={() => setFilterStatus('')}
          />
          Semua
        </label>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="pengaduan-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Waktu</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengaduan.map((item, index) => (
              <tr key={item.id} onClick={() => setSelectedPengaduan(item)}>
                <td>{index + 1}</td>
                <td>{item.judulPengaduan}</td>
                <td>{formatWaktu(item.timestamp)}</td>
                <td>{item.status || 'Belum Diproses'}</td>
                <td className="aksi-cell">
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredPengaduan.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Belum ada data pengaduan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
