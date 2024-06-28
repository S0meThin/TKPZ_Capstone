import React, {useState,useEffect} from "react";
import '../styles/Home.css'

function Home() {
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

    return <div className="home-container">
    {/* {value.map(v => <div><a href={`book/${v.id}`}>{v.name}</a></div>)} */}
      <div className="home-heading">Book store</div>
      <div className="home-message">Welcome to our book store. Feel free to browse our selection: <a href="/genres" className="home-link">Click here!</a></div>
    </div>
}

export default Home;