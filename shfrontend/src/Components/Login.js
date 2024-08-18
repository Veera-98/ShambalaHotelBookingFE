import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Hotel_Entrance from "./Images/se.jpg";


function Login() {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

      const handleSubmit = () => {
        if (!firstName || !password) {
          alert("Please fill out all fields");
          return;
        }
        sessionStorage.setItem("firstName",firstName)
        axios.post('http://localhost:8181/api/hotel-staff/validate/login', {
          firstName, lastName, password, id, role_id: roleId, email, mobileno: mobileNo
        })
          .then(response => {
            console.log(response.data);
            if (response.data === 1) {
              navigate('/staffDashboard');
            } else if (response.data === 2) {
              navigate('/CustomerDashBoard');
            }
          })
          .catch(error => {
            alert("Login failed!");
            console.error(error);
          });
      };

  return (
    <div style={{
      display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundImage: "url('/Images/se.jpg')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "20px",
    }}>
      <div style={{
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2D3748',
          marginBottom: '20px'
        }}>Sign In</h2>
        <input
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          type="text"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#454545',
            color: '#ffffff',
            cursor: 'pointer'
          }}
          onClick={handleSubmit}>Submit</button>
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          width: '100%',
          textAlign: 'center',
          fontSize: '14px',
          color: '#ffffff'
        }}>
          Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/createAccount'); }}>Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;