import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import '../styles/BookEdit.css'
import { csrfToken } from "../csrf";

function BookEdit() {
    let {id} = useParams();
    const [value, setValue] = useState({})
    const [genres, setGenres] = useState([])
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [oh, setOh] = useState('')
    const [picture, setPicture] = useState('')
    const [price, setPrice] = useState('')
    const [genre, setGenre] = useState('')

    const handleSubmit = (e) => {
        fetch(`http://127.0.0.1:8000/api/books/edit/${value.id}`, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            "token": localStorage.getItem('token'),
            "name": name,
            "author": author,
            "oh": oh,
            "picture": picture,
            "price": price,
            "genre": genre
        })
        })
    }

    const handleDelete = (e) => {
        fetch(`http://127.0.0.1:8000/api/books/delete/${value.id}`, {
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
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
        .then((res) => {
        return res.json()
        })
        .then((data) => {
        setValue(JSON.parse(data))
        setName(JSON.parse(data).name)
        setAuthor(JSON.parse(data).author)
        setGenre(JSON.parse(data).genre)
        setOh(JSON.parse(data).oh)
        setPicture(JSON.parse(data).picture)
        setPrice(JSON.parse(data).price)
        })

        fetch(`http://127.0.0.1:8000/api/genres`)
        .then((res) => res.json())
        .then(data => {
            setGenres(JSON.parse(data).genres)
        })
      }, []);

    return (
        <div className="bookEdit-container">
           <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
           </div>
           <div>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
           </div>
           <div>
                <input type="number" value={oh} onChange={(e) => setOh(e.target.value)}/>
           </div>
           <div>
                <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)}/>
           </div>
           <div>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}/>
           </div>
           <div>
            <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>     
                {genres.map(g => <option value={g.name}>{g.name}</option>)}
            </select>
           </div>
           <button onClick={handleSubmit}>Save</button>
           <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default BookEdit;