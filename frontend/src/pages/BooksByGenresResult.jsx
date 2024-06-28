import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import BookComponent from "../components/BookComponent";
import '../styles/BooksByGenresResult.css'

function BooksByGenresResult() {
    const [value, setValue] = useState([])

    let {id} = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/genres/${id}`)
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            setValue(JSON.parse(data).books)
            console.log(JSON.parse(data).books)
          })
      }, []);

    return <div className="BBGR-container">
      {value.map(v => <div className="BBGR-book"><a className="BBGR-link" href={`../book/${v.id}`}><BookComponent name={v.name} author={v.author} picture={v.picture} id={v.id} price={v.price}></BookComponent></a></div>)}
        {/* {value.map(v => <div className="BBGR-book"><a className="BBGR-link" href={`../book/${v.id}`}>{v.name}</a></div>)} */}
    </div>
}

export default BooksByGenresResult;