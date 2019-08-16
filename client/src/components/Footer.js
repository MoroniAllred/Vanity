import React from "react"
import {Link, withRouter} from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div className="footDiv">
                <h2>Vanity</h2>
                <p>Reaching to chang the wold of Beauty</p>
            </div>
            <div className="footDiv">
                <h4>Contact</h4>
                <p>Call: (435) 660-1209</p>
                <p>Email: ginlybri17@gmail.com</p>
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
                <a className="footLink" href="https://istagram.com/beauty_things_by_bri?igshid=50xoozt8111z">Instagram</a>
            </div>
        </footer>
    )
}

export default Footer