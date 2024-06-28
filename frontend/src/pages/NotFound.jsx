import '../styles/NotFound.css'

function NotFound() {
    return <div className="notFound-container">
        <h1 className="notFound-heading">Page not found!</h1>
        <p className="notFound-message-top">The page you are looking for does not exist!</p>
        <p className="notFound-message-bottom">Click <a className="notFound-link" href="/">HERE</a> to go back to the home page!</p>
    </div>
}

export default NotFound;