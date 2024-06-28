import React, {useState,useEffect} from "react";
import BookComponent from "../components/BookComponent";
import '../styles/Cart.css'
import { csrfToken } from "../csrf";

function Cart() {
    const [value, setValue] = useState([])

    const orderAll = async () => {
      const response = fetch(`http://127.0.0.1:8000/api/order`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            "token": localStorage.getItem('token'),
        })
      })
      .then(response => {
        if(response.ok) {
          window.location.reload()
          alert("Ordered")
        }
        else {
          window.location.reload()
          alert("Something went wrong! Try again!")
        }
      })
    }

    const removeFromCart = async (id) => {
      const response = await fetch(`http://127.0.0.1:8000/api/cart`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            "token": localStorage.getItem('token'),
            "id": id
        })
      })
      if (response.ok) {
        window.location.reload();
      }
      else {
        alert("Something went wrong");
      }
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cart?token=${localStorage.getItem('token')}`)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            window.location = "/login"
            throw new Error('Something went wrong');
          })
          .then((data) => {
            setValue(JSON.parse(data).items)
          })
          .catch((error) => {
            console.log('error')
          })
      }, []);
    return <div className="cart-container">
      <div className="cart-heading">Cart</div>
      {value.length == 0? 
        <div className="cart-message">You don`t have enything in the cart!</div>:
          <div className="cart-content">
            {value.map(v => <div className="cart-book"><BookComponent name={v.name} author={v.author} picture={v.picture} id={v.id} price={v.price}></BookComponent><button className="cart-removeBtn" onClick={() => removeFromCart(v.id)}>Remove</button></div>)}
            <div><button className="cart-" onClick={orderAll}>Order all</button></div>
          </div>   
      }
    </div>
}

export default Cart;