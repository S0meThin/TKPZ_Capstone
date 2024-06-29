import React, {useEffect, useState, useRef} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { csrfToken } from '../csrf';
import "../styles/Menu.css"

function UserControl() {
    const [value, setValue] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users', {
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
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            setValue(JSON.parse(data).users)
            console.log(JSON.parse(data).users)
          })
      }, []);
    
    return (
        <div>
            <div>User Control</div>
            <div>
                {value.map(v => <div><Nav.Link href={`./users/${v.id}`}>{v.username}/{v.role}</Nav.Link></div>)}
            </div>
            <Nav.Link href="./usersAdd">Add a user</Nav.Link>
        </div>
    );
}

export default UserControl