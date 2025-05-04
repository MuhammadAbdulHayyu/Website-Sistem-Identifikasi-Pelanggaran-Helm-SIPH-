import "../AdminDashboard/LoginAdmin.css";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Dashboard", { replace: true }); // hindari bisa back
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Dashboard", { replace: true }); 
    } catch (err) {
      setError("Email atau password salah.");
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Masukkan email terlebih dahulu.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email reset password telah dikirim.");
      setError(null);
    } catch (err) {
      setError("Gagal mengirim email reset password.");
      console.error(err.code, err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">
        SISTEM IDENTIFIKASI <br /> PELANGGARAN HELM
      </h1>

      <div className="login-box">
        <h2>MASUK ADMIN</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <p className="forgot-password" onClick={handleForgotPassword}>
            LUPA PASSWORD ?
          </p>

          <button type="submit" className="login-button">
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
