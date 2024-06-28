import React, {useState,useEffect} from "react";
import '../styles/BookComponent.css'

function BookComponent({id, name, author, picture, price}) {

    return <div className="BookComponent-container">
        <a className="cart-link" href={`../book/${id}`}>
            <img className="BookComponent-picture" src={picture} alt="bookPic" width="200px" height="200px"/>
            <div className="BookComponent-name">{name}</div>
            <div className="BookComponent-author">{author}</div>
            <div className="BookComponent-price">${price}</div>
        </a>
    </div>
}

export default BookComponent;