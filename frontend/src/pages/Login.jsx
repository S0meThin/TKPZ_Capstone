import React, { useState, useEffect } from 'react';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { csrfToken } from '../csrf';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem("username", '');
    localStorage.setItem("token", '');
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then(data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)
      handleToken();
      window.location = "/";
    })
    .catch((error) => {
      console.log('error')
    })
  }

  const handleToken = async (e) => {
    const response = fetch('http://127.0.0.1:8000/api/currentUser', {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        "token": localStorage.getItem('token')
      })
    })

    console.log(toString(localStorage.getItem('token')));
  }

  return (<form onSubmit={handleSubmit}>
    <div className="form-r form-r1">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
    </div>
    <div className="form-r form-r2">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Old password" />
    </div>
    <div className="form-r form-r3">
        <button type="submit">Login</button>
    </div>
</form>);
}


export default Login;