import React from "react"
import Home from "./components/Home.js"
import Navbar from "./components/Navbar.js"
import DemoCarousel from "./components/Carosel"
import "./style.css"

const App = () => {
    return(
        <div className="appDiv">
            <Navbar/>
            <DemoCarousel/>
            <Home/>
        </div>
    )
}

export default App