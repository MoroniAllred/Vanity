import React, {Component} from "react"
import axios from "axios"

const GalleryContext = React.createContext();

class GalleryProvider extends Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        return (
            <GalleryContext.Provider value = {
                {}
                }>
                {this.props.children}
            </GalleryContext.Provider>
        )
    }
}
export const withGallery = C => props =>(
    <GalleryContext.Consumer>
        {value => <C {...value} {...props}/>}
    </GalleryContext.Consumer>
)
export default GalleryProvider;