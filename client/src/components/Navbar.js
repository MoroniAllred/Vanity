import React from "react"
import {Link, withRouter} from "react-router-dom"
import "../navStyle.css"

const Navbar = () => {
    return(
        <nav>
            <div className="logo">
                <h2>Vanity</h2>
            </div>
            <div>
                <Link to="/" className="navLink">Home</Link>
                <Link to="/gallery" className="navLink">Gallery</Link>
            </div>
        </nav>
    )
}

export default Navbar