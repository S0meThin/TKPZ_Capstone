import React, {useEffect, useState} from 'react';
import { csrfToken } from '../csrf';

const AdminOnly = ({WrappedComponent, allowedRoles}) => {
  
    const [token, setToken] = useState('')
    const [role, setRole] = useState('C')

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        fetch(`http://127.0.0.1:8000/api/currentUser`, {
            method: 'POST',
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
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                window.location = "/"
                return
            }
        })
        .then (data => {
            console.log(data.userRole)
            if (data.userRole == "A") {
                setRole('A')
            }
            else {
                window.location = '/'
            }
        })
    },[]);
    return <WrappedComponent/>;
};

export default AdminOnly;
