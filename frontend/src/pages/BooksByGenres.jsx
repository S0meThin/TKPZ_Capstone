import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import GenreComponent from "../components/GenreComponent";
import '../styles/BooksByGenres.css'

function BooksByGenres() {
    const [value, setValue] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/genres')
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            setValue(JSON.parse(data).genres)
            console.log(JSON.parse(data).genres)
          })
      }, []);
    return <div className="booksByGenres-container">
      <div className="booksByGenres-heading">All the Genres:</div>
      <div className="booksByGenres-genres">
      {value.map(v => <GenreComponent id = {v.id} name = {v.name}></GenreComponent>)}
        {/* {value.map(v => <div><a href={`genres/${v.id}`}>{v.name}</a></div>)} */}
      </div>
    </div>
}

export default BooksByGenres;