import React from "react"
import {Link, withRouter} from "react-router-dom"
import "../footerStyle.css"

const Footer = () => {
    return (
        <footer>
            <div className="footDiv">
                <h2>Vanity</h2>
                <p>Reaching to chang the wold of Beauty</p>
            </div>
            <div className="footDiv infoColum">
                <h4>Explore</h4>
                <Link to="/" className="footLink">Home</Link>
                <Link to="/gallery" className="footLink">Gallery</Link>
            </div>
            <div className="footDiv">
                <h4>Location</h4>
                <a className="footLink" href="">123 E 456 S, <br/>Rocky Ridge, Utah, 84645</a>
            </div>
            <div className="footDiv infoColum">
                <h4>Follow</h4>
                <a className="footLink" href="">FaceBook</a>
                <a className="footLink" href="">Instagram</a>
            </div>
        </footer>
    )
}

export default Footer