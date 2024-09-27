import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { logo } from '../../assets/index';

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  // Retrieve the stored email from localStorage (saved during account creation)
  const storedEmail = localStorage.getItem("email");
  const storedPhone = localStorage.getItem("mobileNumber");

  const validateInput = (input) => {
    // Simple regex for email validation  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Simple regex for mobile phone validation (Indian numbers as example)
    const phoneRegex = /^[6-9]\d{9}$/;

    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInput(emailOrPhone)) {
      setError("Please enter a valid email address or mobile phone number.");
      return;
    }

    // Check if the input matches the stored email or phone number
    console.log(emailOrPhone,"emailorphone")
    console.log(storedEmail,"storeemail")
    if (emailOrPhone === storedEmail || emailOrPhone === storedPhone) {
      // Navigate to password page if the email/phone matches
      navigate("/Password", { state: { email: emailOrPhone } });
  
    } else {
      setError("The email address or phone number doesn't match any account.");
    }
  };

  return (
    <div className="login-container">
      <div>
        <img className="amazonlogo" src={logo} alt="Amazon Logo" />
      </div>
      <div className="login-box">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="emailOrPhone">Email or mobile phone number</label>
            <input 
              type="text" 
              id="emailOrPhone" 
              name="emailOrPhone" 
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            {error && <p className="error-message text-red-600">{error}</p>}
          </div>
          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
        <p className="bycon">
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-blue-700">Conditions of Use</a> and{" "}
          <a href="#" className="text-blue-700">Privacy Notice</a>.
        </p>
        <a href="#" className="need-help">Need help?</a>
        <hr />
        <div className="mt-[10px]">
          <p className="text-justify font-semibold">Buying for Work?</p>
          <p className="text-justify text-blue-700 text-[600]">
            <a href="#">Shop on Amazon Business</a>
          </p>
        </div>
      </div>
      <div className="flex gap-[20px] items-center mt-[10px]">
        <hr className="hr-new-amazon" />
        <div>New to Amazon</div>
        <hr className="hr-new-amazon" />
      </div>
      <div>
        <Link to="/createAccount" className="create-account-link">
          <button className="create-account-a">
            Create your Amazon account
          </button>
        </Link>
      </div>
      <footer>
        <a href="#">Conditions of Use</a> <span>|</span> <a href="#">Privacy Notice</a> <span>|</span>{" "}
        <a href="#">Help</a>
      </footer>
    </div>
  );
}

export default Login;
