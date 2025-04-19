import "../AdminDashboard/LoginAdmin.css";
import { useState } from "react";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h1 className="title">SISTEM IDENTIFIKASI <br /> PELANGGARAN HELM</h1>
      
      <div className="login-box">
        <h2>MASUK ADMIN</h2>
        <form>
          <label>Email*</label>
          <input
            type="email"
            placeholder="mail@adminexample.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password*</label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="forgot-password">LUPA PASSWORD ?</p>

          <button type="submit" className="login-button">MASUK</button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
