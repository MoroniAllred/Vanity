import React from "react"
import {withAdmin} from "../../../context/AdminProvider"

const AdGallery = (props) => {
    return(
        <div>
            <button onClick={props.logout}>LogOut</button>
            <h1>Adgallery</h1>
        </div>
    )
}

export default withAdmin(AdGallery)