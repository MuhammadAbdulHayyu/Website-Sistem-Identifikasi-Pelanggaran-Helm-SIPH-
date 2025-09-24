import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload, FaCalendarAlt } from "react-icons/fa";
import "../AdminDashboard/Foto.css";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const storage = getStorage();

const fetchImageAsBlob = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Gagal fetch ${url}`);
  return await response.blob();
};

const Foto = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fotoList, setFotoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedPages, setLoadedPages] = useState({});
  const [errorImages, setErrorImages] = useState({});
  const downloadCancelled = useRef(false);

  const itemsPerPage = 10;

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  const formatReadableDate = (filename) => {
    const match = filename.match(/violation_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/);
    if (!match) return "Tanggal tidak diketahui";
    const [_, date, time] = match;
    return `${date.split("-").reverse().join("-")}, ${time.replace(/-/g, ":")} WIB`;
  };

  // Ambil daftar file dari folder dan ambil URL langsung untuk halaman pertama
  useEffect(() => {
    const fetchFotoNames = async () => {
      setLoading(true);
      setLoadedPages({});
      setErrorImages({});
      const folderRef = ref(storage, "pelanggaran");

      try {
        const res = await listAll(folderRef);
        const formattedDate = formatDateKey(selectedDate);
        const matchedItems = res.items.filter((item) =>
          item.name.includes(formattedDate)
        );

        const first10Items = matchedItems.slice(0, itemsPerPage);

        const itemsWithURL = await Promise.all(
          first10Items.map(async (item) => {
            try {
              const url = await getDownloadURL(item);
              return {
                name: item.name,
                ref: item,
                url,
                tanggal: formatReadableDate(item.name),
              };
            } catch (err) {
              console.error("Gagal ambil URL:", item.name, err);
              return {
                name: item.name,
                ref: item,
                url: null,
                tanggal: formatReadableDate(item.name),
              };
            }
          })
        );

        const restItems = matchedItems.slice(itemsPerPage).map((item) => ({
          name: item.name,
          ref: item,
          url: null,
          tanggal: formatReadableDate(item.name),
        }));

        setFotoList([...itemsWithURL, ...restItems]);
        setCurrentPage(1);
        setLoadedPages({ 1: true });
      } catch (error) {
        console.error("Gagal memuat nama file:", error);
        setFotoList([]);
      }

      setLoading(false);
    };

    fetchFotoNames();
  }, [selectedDate]);

  // Load URL untuk halaman selain page 1
  useEffect(() => {
    if (currentPage === 1 || loading || fotoList.length === 0 || loadedPages[currentPage]) return;

    const loadURLsForCurrentPage = async () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = currentPage * itemsPerPage;

      const updatedItems = await Promise.all(
        fotoList.slice(start, end).map(async (item) => {
          try {
            const url = await getDownloadURL(item.ref);
            return { ...item, url };
          } catch (err) {
            console.error("Gagal ambil URL:", item.name, err);
            return { ...item, url: null };
          }
        })
      );

      setFotoList((prev) => {
        const updated = [...prev];
        for (let i = 0; i < updatedItems.length; i++) {
          updated[start + i] = updatedItems[i];
        }
        return updated;
      });

      setLoadedPages((prev) => ({ ...prev, [currentPage]: true }));
    };

    loadURLsForCurrentPage();
  }, [currentPage, fotoList, loading, loadedPages]);

  const handleDownloadImage = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Gagal download ${url}`);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      console.error("Download gagal:", error);
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    setProgress(0);
    downloadCancelled.current = false;
    const zip = new JSZip();

    try {
      for (let i = 0; i < fotoList.length; i++) {
        if (downloadCancelled.current) break;

        const item = fotoList[i];
        try {
          const url = item.url || (await getDownloadURL(item.ref));
          const blob = await fetchImageAsBlob(url);
          zip.file(item.name, blob);
          setProgress(Math.round(((i + 1) / fotoList.length) * 100));
        } catch (err) {
          console.error("Gagal zip:", item.name, err);
        }
      }

      if (!downloadCancelled.current) {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `pelanggaran_${formatDateKey(selectedDate)}.zip`);
      }
    } catch (error) {
      console.error("Gagal ZIP:", error);
    }

    setIsDownloading(false);
  };

  const cancelDownload = () => {
    downloadCancelled.current = true;
    setIsDownloading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fotoList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(fotoList.length / itemsPerPage);

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

      <section className="content">
        {loading ? (
          <p>Memuat data foto...</p>
        ) : currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div className="foto-card" key={index}>
              <div className="foto-wrapper">
                {item.url && !errorImages[item.name] ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="foto-preview"
                    onError={() =>
                      setErrorImages((prev) => ({
                        ...prev,
                        [item.name]: true,
                      }))
                    }
                  />
                ) : errorImages[item.name] ? (
                  <p>Gagal memuat gambar</p>
                ) : (
                  <p>Memuat gambar...</p>
                )}
              </div>
              <div className="foto-info">
                <p>{item.tanggal}</p>
                <button
                  onClick={() => handleDownloadImage(item.url, item.name)}
                  className="download-btn"
                  disabled={!item.url}
                >
                  <FaDownload className="icon" />
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Tidak ada foto pada tanggal ini</p>
        )}
      </section>

      {fotoList.length > itemsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`page-btn ${currentPage === idx + 1 ? "active" : ""}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {fotoList.length > 0 && !isDownloading && (
        <button className="all-download" onClick={handleDownloadAll}>
          Download All
        </button>
      )}

      {isDownloading && (
        <div className="download-progress">
          <p>Downloading... {progress}%</p>
          <progress value={progress} max="100" />
          <button onClick={cancelDownload} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Foto;
