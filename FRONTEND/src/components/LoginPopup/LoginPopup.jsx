import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken , setUserId , setRole} = useContext(StoreContext);
  const navigate = useNavigate()

  const [currState, setCurrstate] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/login";
    } else {
      newUrl += "/api/register";
    }

    if (currState === "Sign Up" && data.password !== data.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try { 
      const response = await axios.post(newUrl, data);
      const token = response.data.token;
      const userId = response.data.id;
      const role = response.data.role_name;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      setToken(token);
      setUserId(userId);
      setRole(role);
      setShowLogin(false);

      if (role === "admin"){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
    } catch (error) {
      const field = error.response.data.field ;
      setErrors({ [field]: error.response.data.message });
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          {currState === "Sign Up" && (
            <>
              <input
                name="confirmPassword"
                onChange={onChangeHandler}
                value={data.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                required
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </>
          )}
        </div>

        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ?
          <p>Create a new account? <span onClick={() => setCurrstate("Sign Up")}>Click here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrstate("Login")}>Login here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopup;
