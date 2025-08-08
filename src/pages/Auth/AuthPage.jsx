import React, { useState } from "react";
import "../../Auth.css"; // ou le chemin de ton CSS si renommé
import "boxicons/css/boxicons.min.css";

function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="auth-container">
    <div className={`container ${isRegistering ? "active" : ""}`}>
      {/* --- FORM BOX --- */}
      <div className="form-box login">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>

      <div className="form-box register">
        <form>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>

      {/* --- TOGGLE BOX --- */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn" onClick={toggleMode}>
            Register
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>New Here?</h1>
          <p>Create your account to get started</p>
          <button className="btn" onClick={toggleMode}>
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AuthPage;
