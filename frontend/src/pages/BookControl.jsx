import React, {useEffect, useState, useRef} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { csrfToken } from '../csrf';

function BookControl() {
    const [value, setValue] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books')
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            setValue(JSON.parse(data).books)
            console.log(JSON.parse(data).books)
          })
      }, []);

    return (
        <div>
            <div>Book Control</div>
            <div>
                {value.map(v => <div><Nav.Link href={`./books/${v.id}`}>{v.name}/{v.genre}</Nav.Link></div>)}
            </div>
            <Nav.Link href="./booksAdd">Add a book</Nav.Link>
        </div>
    );
}

export default BookControl