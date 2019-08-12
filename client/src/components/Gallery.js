import React, {Component} from "react"
import axios from "axios"
import GalleryText from "./GalleryText.js"

class Gallery extends Component{
    constructor(){
        super()
        this.state = {
            pictures: []
        }
    }
    componentDidMount = () =>{
        axios.get("/pictures")
    .then((res) => this.setState({
        pictures: res.data
    }))
        .catch()

    }
    render(){
        const mappedPictures = this.state.pictures.map(pic => <GalleryText {...pic}/>)

        return(
            <div className="center">
                <div className="galleryDiv">
                    {mappedPictures}
                </div>
            </div>
        )
    }
}

export default Gallery