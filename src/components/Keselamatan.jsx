import '../styles/Keselamatan.css';
import SIPHImage from '../Assets/SIPH.jpg';
import { useEffect } from 'react'; 
import ScrollReveal from "scrollreveal"; 

function Keselamatan() {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 2000,  
      delay: 300,
      reset: false, 
    });

    
    sr.reveal(".section", { origin: 'left', interval: 200 });

    
    sr.reveal(".section.reverse1", { origin: 'right', interval: 200 });

  }, []);
  return (
    <div className="content-container">
      <h1 className="judul no-reveal">Pentingnya Penggunaan Helm</h1>

      <div className="section">
        <div className="gambar">
          <img src={SIPHImage} alt="Penggunaan Helm" />
        </div>
        <div className="text1">
          <h2>Mengurangi Risiko Cedera Fatal</h2>
          <p>
            Helm berfungsi untuk melindungi kepala dari benturan keras yang bisa berakibat fatal. 
            Menggunakan helm secara benar dapat mengurangi kemungkinan cedera serius atau kematian akibat kecelakaan lalu lintas.
          </p>
        </div>
      </div>

      <div className="section reverse1">
        <div className="text1">
          <h2>Kewajiban Hukum</h2>
          <p>
            Berdasarkan Peraturan Pemerintah Republik Indonesia, penggunaan helm adalah kewajiban 
            yang harus dipatuhi oleh setiap pengendara sepeda motor. Tidak mengenakan helm dapat dikenai sanksi tilang oleh petugas.
          </p>
        </div>
        <div className="gambar">
          <img src={SIPHImage} alt="Kewajiban Helm" />
        </div>
      </div>

      <div className="section">
        <div className="gambar">
          <img src={SIPHImage} alt="Keselamatan Kampus" />
        </div>
        <div className="text1">
          <h2>Keselamatan di Kampus</h2>
          <p>
            Lingkungan kampus yang sering padat dengan aktivitas mahasiswa, 
            helm membantu mencegah risiko kecelakaan. Penggunaan helm adalah langkah preventif untuk menjaga keamanan di area kampus.
          </p>
        </div>
      </div>

      <div className="section reverse1">
        <div className="text1">
          <h2>Contoh Kepedulian Terhadap Sesama</h2>
          <p>
            Menggunakan helm dengan benar menunjukkan tanggung jawab pribadi dan sosial. 
            Ini merupakan contoh yang baik bagi sesama mahasiswa dan pengendara lainnya.
          </p>
        </div>
        <div className="gambar">
          <img src={SIPHImage} alt="Contoh Kepedulian" />
        </div>
      </div>
    </div>
  );
}

export default Keselamatan;
