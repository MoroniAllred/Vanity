import React from "react"
import VCarousel from "./Carousel.js"

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
            <div className="devider"></div>
            <div className="honeDiv">
                <div className="sideDevider"></div>
                <VCarousel/>
                <div className="homeDescription">
                    <h1>Vanity</h1>
                    <p>Reaching to change the world though Beauty</p>
                </div>
                <div className="sideDevider"></div>
            </div>
            <div className="devider"></div>
        </div>
    )
}

export default Home