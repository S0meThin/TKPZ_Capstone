import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import '../styles/Book.css'
import { csrfToken } from "../csrf";

function Book() {
    let {id} = useParams();
    const [value, setValue] = useState({})

    const handleAddToCart = (e) => {
        fetch("http://127.0.0.1:8000/api/cart", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            "token": localStorage.getItem('token'),
            "id": value.id
        })
        })
        .then(response => {
            if(response.status == 402) {
                window.location = '/login'
            }
            else if (!response.ok) {
                alert("Something went wrong")
            }
            window.location = '/cart'
        })
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
        .then((res) => {
        return res.json()
        })
        .then((data) => {
        setValue(JSON.parse(data))
        console.log(JSON.parse(data))
        })
      }, []);

    return (
        <div className="book-container">
            <div className="book-bookCard"> 
                <img src={value.picture} alt="Book img" width="400px" height="400px" />    
                <div className="book-name">{value.name}</div>
                <div className="book-genre">Genre: {value.genre}</div>
                <div className="book-author">Written by: {value.author}</div>
                {value.oh == 0?<div className="book-outOfStock">Not in stock</div>:<div className="book-inStock">In stock: {value.oh}</div>}
                <div className="book-price">Price: {value.price}$</div>
                <div className="book-cart">
                {value.oh == 0?<></>:
                    <button onClick={handleAddToCart}>Add to cart!</button>
                }
                </div>
            </div>
        </div>
    )
}

export default Book;