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
                <h1 className={this.state.galleryTitle}>{this.props.title}</h1>
                <div className={this.state.beforePic} style={{backgroundImage: `url(${this.props.beforePic})`}}></div>
                <div className="afterPic" style={{backgroundImage: `url(${this.props.afterPic})`}} onMouseEnter={this.handleHover}></div>
                <h3 className={this.state.picDescription}>Before</h3>
                <h3 className={this.state.picDescription}>After</h3>
                <p className={this.state.galleryDescription}>{this.props.description}</p>
            </div>
        )
    }
}

export default GalleryText