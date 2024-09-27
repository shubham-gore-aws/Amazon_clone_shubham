import React, { useState } from 'react';
import './Password.css';
import { logo } from '../../assets/index';
import { useNavigate, useLocation } from 'react-router-dom';

function Password() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the stored password from localStorage
    const storedPassword = localStorage.getItem("password");

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function validatePassword() {
        // Check if the input password matches the stored password
        if (password !== storedPassword) {
            setPasswordError('The password you entered is incorrect.');
            return false;
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    function handleSignIn(event) {
        event.preventDefault();
        if (validatePassword()) {
            navigate("/header"); // Navigate to header page if password is valid
        }
    }

    return (
        <div className="signin-container">
            <img src={logo} alt="Amazon Logo" className="signin-logo" />
            <div className="signin-box">
                <h1 className='sing_in'>Sign in</h1>
                <form onSubmit={handleSignIn}>
                    <label className='Password'>Password</label>
                    <p className='location'>{location.state?.email} <a className='change'>change</a></p>
                    <div className="password-input-container flex">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            className="signin-input" 
                            value={password} 
                            onChange={handlePasswordChange} 
                        />
                        <span className="password-toggle-icon flex items-center " onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    {passwordError && <p className="password-error">{passwordError}</p>}
                    <button type="submit" className="signin-button">Sign in</button>
                </form>
                <div className="signin-options">
                    <input type="checkbox" id="keep-signed-in" />
                    <label htmlFor="keep-signed-in">Keep me signed in.</label>
                </div>
                <a className="signin-forgot-password">Forgot password?</a>
            </div>
            <footer>
                <a href="/">Conditions of Use</a>
                <a href="/">Privacy Notice</a>
                <a href="/">Help</a>
                <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </footer>
        </div>
    );
}

export default Password;
