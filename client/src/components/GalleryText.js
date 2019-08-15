import React, {Component} from "react"

class GalleryText extends Component{
    constructor(props){
        super(props)
        this.state = {
            galleryTitle: "none",
            beforePic: "none",
            picDescription: "none",
            galleryDescription: "none",
        }
    }


    /* both handleHover and handle leave are for somthing that I want to inpament but isn't working yet */
    handleHover = () => {
        this.setState({
            galleryTitle: "galleryTitle",
            beforePic: "beforePic",
            picDescription: "picDescription",
            galleryDescription: "galleryDescription",
        })
    }

    handleLeve = () => {
        this.setState({
            galleryTitle: "none",
            beforePic: "none",
            picDescription: "none",
            galleryDescription: "none",

        })
    }

    render(){
        return(
            <div className="galleryTextDiv" onMouseLeave={this.handleLeve}>
                <h1 className="galleryTitle">{this.props.title}</h1>
                <div className="beforePic" style={{backgroundImage: `url(${this.props.beforePic})`}}></div>
                <div className="afterPic" style={{backgroundImage: `url(${this.props.afterPic})`}} onMouseEnter={this.handleHover}></div>
                <h3 className="picDescription">Before</h3>
                <h3 className="picDescription">After</h3>
                <p className="galleryDescription">{this.props.description}</p>
            </div>
        )
    }
}

export default GalleryText