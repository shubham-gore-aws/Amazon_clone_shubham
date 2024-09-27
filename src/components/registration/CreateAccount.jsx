import React, { useState } from "react";
import "./CreateAccount.css";
import { logo } from '../../assets/index';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Createaccountobj } from "../../cartSlice";

function CreateAccount() {
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP sent flag
  const [otp, setOtp] = useState(""); // State to store entered OTP
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store generated OTP
  const [isOtpVerified, setIsOtpVerified] = useState(false); // State to track OTP verification

  const dispatch = useDispatch();

  // Function to generate a random OTP (6-digit number)
  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit random OTP
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault(); // Prevents page refresh on form submit

    // Validate email and mobile number
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidMobileNumber(mobileNumber)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    // Generate OTP and show alert
    const generatedOtp = generateRandomOtp();
    setGeneratedOtp(generatedOtp);
    alert(`Your OTP is: ${generatedOtp}`);

    setIsOtpSent(true); // Update state to show the OTP input form
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault(); // Prevents page refresh on verification submit

    // Check if the entered OTP matches the generated OTP
    if (otp === generatedOtp) {
      const obj = { yourName, email, mobileNumber, password };

      // Dispatch to Redux
      dispatch(Createaccountobj(obj));

      // Save to localStorage
      localStorage.clear();

      localStorage.setItem("yourName", yourName);
      localStorage.setItem("email", email);
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("password", password);

      console.log("Account created and stored:", obj);

      // Mark OTP as verified
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Helper function to check email validity (replace with your actual validation logic)
  const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  // Helper function to check mobile number validity
  const isValidMobileNumber = (mobileNumber) => {
    const mobileRegex = /^[0-9]{10}$/; // For India (10 digits). Adjust as necessary for other countries.
    return mobileRegex.test(mobileNumber);
  };

  return (
    <div className="create-account-container">
      <img src={logo} alt="Amazon Logo" className="amazonlogo" />

      <div className="create-account-box">
        <h2>Create Account</h2>

        {!isOtpSent ? (
          <form onSubmit={handleCreateAccount}>
            <div className="input-group">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                value={yourName}
                id="name"
                name="name"
                placeholder="First and last name"
                required
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                value={email}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="mobile">Mobile number</label>
              <div className="mobile-input">
                <select id="country-code" name="country-code">
                  <option value="IN">IN +91</option>
                </select>
                <input 
                  type="text" 
                  value={mobileNumber} 
                  id="mobile" 
                  name="mobile" 
                  placeholder="Mobile number" 
                  required 
                  onChange={(e) => setMobileNumber(e.target.value)} 
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                value={password} 
                id="password" 
                name="password" 
                placeholder="At least 6 characters" 
                required 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <small>Passwords must be at least 6 characters.</small>
            </div>

            <button type="submit" className="verify-button">
              Send OTP  
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input 
                type="text" 
                value={otp} 
                id="otp" 
                name="otp" 
                placeholder="Enter OTP sent to your email" 
                required 
                onChange={(e) => setOtp(e.target.value)} 
              />
            </div>
            <button type="submit" className="verify-button">
              Verify OTP
            </button>
          </form>
        )}

        {isOtpVerified && (
          <div className="sign-in-link">
            <Link to="/">
              <p>OTP verified! Sign in here</p>
            </Link>
          </div>
        )}

        <div className="work-account">
          <p>Buying for work?</p>
          <a href="#" className="business-account-link">Create a free business account</a>
        </div>

        <footer className="create-account-footer">
          <a href="#">Conditions of Use</a> <span>|</span> 
          <a href="#">Privacy Notice</a> <span>|</span> 
          <a href="#">Help</a>
        </footer>
      </div>
    </div>
  );
}

export default CreateAccount;
