import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import '../styles/BookEdit.css'
import { csrfToken } from "../csrf";

function UserAdd() {
    const [value, setValue] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        fetch(`http://127.0.0.1:8000/api/users/add`, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            "token": localStorage.getItem('token'),
            "username": username,
            "password": password,
            "role": role,
            "email": email
        })
        })
    }

    return (
        <div className="bookEdit-container">
           <div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
           </div>
           <div>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
           </div>
           <div>
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>     
                <option value='A'>A</option>
                <option value='C'>C</option>
            </select>
           </div>
           <button onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default UserAdd;