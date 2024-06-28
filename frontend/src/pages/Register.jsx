import React, { useState } from 'react';
import '../styles/Register.css'
import { useNavigate } from 'react-router-dom';
import { csrfToken } from '../csrf';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = fetch("http://127.0.0.1:8000/api/register", {
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
      if(!response.ok) {
        alert("Something went wrong!")
      }
      else {
        alert("User created")
        setTimeout(() => {window.location = '/login'}, 1000)
      }
    })

    console.log(await response);
  }
    return <form onSubmit={handleSubmit}>
    <div className="form-r form-r1">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
    </div>
    <div className="form-r form-r2">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Old password"/>
    </div>
    <div className="form-r form-r3">
        <button type="submit">Register</button>
    </div>
</form>
}

export default Register;