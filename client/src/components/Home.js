import React from "react"
import VCarousel from "./Carousel.js"
import "../home.css"

const Home = () => {
    return(
        <div className="homeMainDiv">
            <div className="headImg">
                <div className="grayer">
                    <div className="centerer">
                        <h1>Vanity</h1>
                    </div>
                </div>
            </div>
            <div className="honeDiv">
                <VCarousel/>
                <div className="homeDescription">
                    <h1>Vanity</h1>
                    <p>Reaching to change the workd though Beauty</p>
                </div>
            </div>
        </div>
    )
}

export default Home