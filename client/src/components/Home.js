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

                {/* Carousel of pictures */}
                <VCarousel/>
                
                <div className="homeDescription">
                    <h1 className="descriptH1">Mission Statment</h1>
                    <p className="missionState">My mission is to inspire those around me, through my creativity and work ethic. I 
                        want to be kind to everyone and encourage them on a daily basis! I seek to evolve 
                        and never stop learning and continually get better. I want to share my passion for 
                        beauty and show through example that beauty is being the best possible version of 
                        yourself on the inside and out.</p>
                        <h1 className="descriptH1">Services include</h1>
                        <ul>
                            <li>Eye lash extentions</li>
                            <li>One Step</li>
                            <li>Balayage</li>
                            <li>Highlights</li>
                            <li>Cuts</li>
                            <li>Waxing</li>
                            <li className="listEnd">Hair desighn</li>
                        </ul>
                </div>
                <div className="sideDevider"></div>
            </div>
            <div className="devider"></div>
        </div>
    )
}

export default Home