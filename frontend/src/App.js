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
import AdminOnly from "./components/AdminOnly"
import Inventory from "./pages/Inventory"
import BookControl from './pages/BookControl'
import UserControl from './pages/UserControl'
import BookEdit from './pages/BookEdit'
import UserEdit from './pages/UserEdit'
import BookAdd from './pages/BookAdd'
import UserAdd from './pages/UserAdd'
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
          <Route path = "/admin" element = {<AdminOnly WrappedComponent={Inventory} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/books" element = {<AdminOnly WrappedComponent={BookControl} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/users" element = {<AdminOnly WrappedComponent={UserControl} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/booksAdd" element = {<AdminOnly WrappedComponent={BookAdd} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/books/:id" element = {<AdminOnly WrappedComponent={BookEdit} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/users/:id" element = {<AdminOnly WrappedComponent={UserEdit} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "/admin/usersAdd" element = {<AdminOnly WrappedComponent={UserAdd} allowedRoles={'A'}></AdminOnly>}/>
          <Route path = "*" element = {<NotFound></NotFound>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
