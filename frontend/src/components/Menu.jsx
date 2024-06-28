import React, {useEffect, useState, useRef} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { csrfToken } from '../csrf';
import "../styles/Menu.css"

function Menu() {
    const [result, setResult] = useState([])
    const [user, setUser] = useState('')
    const Res = useRef()

    useEffect(() => {
        let u = localStorage.getItem('username');
        setUser(u);
        if (u) { // Check if u is not null or an empty string
            console.log(u); // Log the value of u directly
        }   
    }, []);

    const logout = (e) => {
        fetch(`http://127.0.0.1:8000/api/logout`,{ 
            method: 'PUT',
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
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location = "/"
    }

    const fetchSearch = (value) => {
        fetch(`http://127.0.0.1:8000/api/genres/${value}`)
        .then((res) => {
            return res.json()
          })
        .then((data) => {
            setResult(JSON.parse(data).books)
            console.log(JSON.parse(data).books)
          })
    }

    const handleChange = (v) => {
        fetchSearch(v)
        
        if (v == '' || result.length == 0) {
            Res.current.style.display = "none";
            setResult([])
            return
        }
        Res.current.style.display = "block";
    }

    return (
        <Navbar>
            <Container>
                <Nav className="menu-container">
                    <Nav.Link className = "menu-link" href="#" onClick={() => window.history.back()}>Back</Nav.Link>
                    <Nav.Link className = "menu-link" href="/">Home</Nav.Link>
                    <Nav.Link className = "menu-link" href="/genres">Genres</Nav.Link>
                    <input className="menu-input" type="text" onChange={(e) => {handleChange(e.target.value)}}/>
                    <div ref={Res} className="menu-input-result" style={{display: "none"}}>
                        {result ? result.map(v => <div><Nav.Link className="menu-input-item" href={`../book/${v.id}`}>{v.name}</Nav.Link></div>): <div></div>}
                    </div>
                    {user ? (
                        <><Nav.Link className = "menu-link" href="/account">{user}</Nav.Link><Nav.Link className = "menu-link" onClick={logout}>Log out</Nav.Link></>
                    ) : (
                        <><Nav.Link className = "menu-link" href="/login">Login</Nav.Link><Nav.Link className = "menu-link" href="/register">Register</Nav.Link></>
                    )}
                    <Nav.Link className = "menu-link" href="/cart">Cart</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Menu