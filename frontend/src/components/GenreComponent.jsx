import React, {useState,useEffect} from "react";
import '../styles/GenreComponent.css'

function GenreComponent({id, name}) {
    return <div className="genre-container">
        <a className="genre-link" href={`/genres/${id}`}>{name}</a>
    </div>
}

export default GenreComponent;