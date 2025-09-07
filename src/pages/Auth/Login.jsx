import React, { useState } from "react";
import "../../Auth.css";
//import "boxicons/css/boxicons.min.css";

function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // const toggleMode = () => {
  //   setIsRegistering(!isRegistering);
  // };
  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering && formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Formulaire :", formData);
  };

  return (
    <div className="auth-container">
      <div className={container ${isRegistering ? "active" : ""}}>
        {/* --- LOGIN FORM --- */}
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>

        {/* --- REGISTER FORM --- */}
        <div className="form-box register">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  status
                </option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
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

