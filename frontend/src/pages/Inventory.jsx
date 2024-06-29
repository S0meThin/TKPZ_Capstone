import React, {useEffect, useState, useRef} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { csrfToken } from '../csrf';
import "../styles/Menu.css"

function Inventory() {
    
    return (
        <div>
            <div>Inventory Control</div>
            <div>
                <div><Nav.Link href="/admin/books">1.Book control</Nav.Link></div>
                <div><Nav.Link href="/admin/users">2.User control</Nav.Link></div>
            </div>
        </div>
    );
}

export default Inventory