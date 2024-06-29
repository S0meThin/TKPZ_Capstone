import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import '../styles/UserEdit.css'
import { csrfToken } from "../csrf";

function UserEdit() {
    let {id} = useParams();
    const [value, setValue] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = (e) => {
        fetch(`http://127.0.0.1:8000/api/users/edit/${value.id}`, {
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
            "email": email,
            "role": role
        })
        })
    }

    const handleDelete = (e) => {
        fetch(`http://127.0.0.1:8000/api/users/delete/${value.id}`, {
        method: "DELETE",
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
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/${id}`)
        .then((res) => {
        return res.json()
        })
        .then((data) => {
        setValue(JSON.parse(data))
        console.log(JSON.parse(data))
        setUsername(JSON.parse(data).username)
        setEmail(JSON.parse(data).email)
        setRole(JSON.parse(data).role)
        })
      }, []);

    return (
        <div className="userEdit-container">
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
                <option value="A">A</option>
                <option value="C">C</option>
            </select>
           </div>
           <button onClick={handleSubmit}>Save</button>
           <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default UserEdit;