import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import '../styles/Account.css'
import { csrfToken } from "../csrf";

function Account() {
    const [username, setUsername] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/account", {
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
            "oldpassword": oldpassword,
            "newpassword": newpassword
        })
        })
        .then(response => {
            if(!response.ok) {
                alert("something went wrong!")
            }
            else {
                alert("password updated")
            }
            setOldPassword('')
            setNewPassword('')
        })
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        if (!localStorage.getItem("username") || !localStorage.getItem("token")) {
            window.location = "/login"
        }
      }, []);

    return (<form onSubmit={handleSubmit}>
        <div className="form-r form-r1">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
        </div>
        <div className="form-r form-r2">
            <input type="password" value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} required placeholder="Old password" />
        </div>
        <div className="form-r form-r3">
            <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder = "New password"/>
        </div>
        <div className="form-r form-r4">
            <button type="submit">Change the password</button>
        </div>
    </form>);
}

export default Account;