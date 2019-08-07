import React from "react"
import {Link, withRouter} from "react-router-dom"

const Navbar = () => {
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
        </nav>
    )
}

export default Navbar