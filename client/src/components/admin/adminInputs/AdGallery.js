import React, {Component} from "react"
import {withAdmin} from "../../../context/AdminProvider"
import axios from "axios"
import {storage} from "../../../firebase/index.js"

class AdGallery extends Component {
    constructor(props){
        super(props)
        this.state ={
            selectedFile: null,
            secondSelectedFiles: null,
            url: "",
            secondUrl: "",
            progress: 0,
            secondProgress:0,
            galleryInfo: [],
            title: "",
            description: ""
        }
    }
    flieSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(e.target.files)
    }
    
    secondFileUploadHandler = e => {
        this.setState({
            secondSelectedFiles: e.target.files[0]   
        })
        console.log(e.target.files)
    }

    handleClick = () => {
        if(this.state.selectedFile !== null && this.state.secondSelectedFiles !== null){
            this.fileUploadHandler()
            this.secondFileUploader()
        }else{
            alert("all filds must be filled in befor you can submit your upload")
        }
    }
    
    fileUploadHandler = () => {
        const uploadTask = storage.ref(`gallery/${this.state.selectedFile.name}`).put(this.state.selectedFile)
        uploadTask.on("state_changed", 
        (snapshot) => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            this.setState({
                progress: progress
            })
        }, (error) => {
            //error fun ction
            console.log(error)
        }, 
        () => {
            //compete function
            storage.ref("gallery").child(this.state.selectedFile.name).getDownloadURL().then(url => {
                console.log(url)
                this.setState({
                    url: url
                })
            })
        });
    }
    
    secondFileUploader = () =>{
        console.log(this.state.secondSelectedFile)
        console.log(this.state.secondSelectedFile)
        const uploadTask = storage.ref(`secondGallery/${this.state.secondSelectedFiles.name}`).put(this.state.secondSelectedFiles)
        uploadTask.on("state_changed", 
        (snapshot) => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            this.setState({
                secondProgress: progress
            })
        }, (error) => {
            //error fun ction
            console.log(error)
        }, 
        () => {
            //compete function
            storage.ref("secondGallery").child(this.state.secondSelectedFiles.name).getDownloadURL().then(url => {
                console.log(url)
                this.setState({
                    secondUrl: url
                })
            })
        });
    }
    
        handleSubmimt = () => {
            console.log(this.state)
            axios.post("/pictures", {title: this.state.title, beforePic: this.state.url, afterPic: this.state.secondUrl, description: this.state.description})
                .then(res => console.log(res))
                .catch(err => console.dir(err))
        }

        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    render(){
        return(
            <div>
            <button onClick={this.props.logout}>LogOut</button>
            Progress for Photo upload:<progress value={this.state.progress + this.state.secondProgress / 2} max="100"/>
            <form>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title"/>
                <input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} placeholder="description"/>
            </form>
            Input before image:<input type="file" onChange={this.flieSelectedHandler}/>
            {/* <progress value={this.state.secondProgress + this.state.secondProgress / 2}/> */}
            Input after image:<input type="file" onChange={this.secondFileUploadHandler}/>
            <button onClick={this.handleClick}>Upload</button>
            <button onClick={this.handleSubmimt}>submit</button>
        </div>
    )}
}

export default withAdmin(AdGallery)