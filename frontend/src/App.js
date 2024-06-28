import {BrowserRouter, Routes, Route, Navigation} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Menu from './components/Menu'
import BooksByGenres from './pages/BooksByGenres'
import BooksByGenresResult from "./pages/BooksByGenresResult"
import Book from "./pages/Book"
import Cart from './pages/Cart'
import Account from "./pages/Account"
import './App.css'



function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
        <Routes>
          <Route path = "/" element = {<Home></Home>}/>
          <Route path = "/register" element = {<Register></Register>}/>
          <Route path = "/login" element = {<Login></Login>}/>
          <Route path = "/genres" element = {<BooksByGenres></BooksByGenres>}/>
          <Route path = "/genres/:id" element = {<BooksByGenresResult></BooksByGenresResult>}/>
          <Route path = "/book/:id" element = {<Book></Book>}/>
          <Route path = "/cart" element = {<Cart></Cart>}/>
          <Route path = "/account" element = {<Account></Account>}/>
          <Route path = "*" element = {<NotFound></NotFound>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
