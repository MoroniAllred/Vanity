import React, {Component} from "react"
import axios from "axios";
import {storage} from "../../../firebase/index.js"
    
class AdGalleryText extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            secondSelectedFiles: null,
            title: props.title,
            progress: 0,
            secondProgress:0,
            beforePic: props.beforePic,
            afterPic: props.afterPic,
            description: props.description,
            url: props.url,
            secondUrl: props.secondUrl,
            toggle: false,
            hasUrl: true
        }
    }

    edditToggle = () => {
        this.setState
        ({
            toggle: !this.state.toggle
        })
    }

    delete = () => {
        axios.delete(`/pictures/${this.props._id}`)
        .then(res => {
            this.props.handleDelet(this.props._id)
        })
        .catch((err) => console.log(err))
    }

    uploadImg = () => {
        
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

    fileUploadHandler = () => {
        const uploadTask = storage.ref(`gallery/${this.state.selectedFile.name}`).put(this.state.selectedFile)
        uploadTask.on("state_changed", 
        (snapshot) => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            this.setState({
                progress: progress,
                hasUrl: false
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
                url: url,
                hasUrl: true
            })
        })
    });
}

secondFileUploader = () =>{
    const uploadTask = storage.ref(`secondGallery/${this.state.secondSelectedFiles.name}`).put(this.state.secondSelectedFiles)
    uploadTask.on("state_changed", 
    (snapshot) => {
        //progress function
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
        this.setState({
            secondProgress: progress,
            hasUrl: false
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
                secondUrl: url,
                hasUrl: true
            })
            })
        });
    }

    handleClick = () => {
        if(this.state.selectedFile !== null && this.state.secondSelectedFiles !== null){
            this.fileUploadHandler()
            this.secondFileUploader()
        }else if(this.state.selectedFile !== null && this.state.secondSelectedFiles === null){
            this.fileUploadHandler()
        }else if(this.state.secondSelectedFiles !==null && this.state.selectedFile === null){
            this.secondFileUploader()
        }else{
            alert("you have no file selected to uplaod")
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmimt = (e) => {
        e.preventDefault()
        if(this.state.hasUrl === true){
            axios.put(`/pictures/${this.props._id}`, {title: this.state.title, beforePic: this.state.url, afterPic: this.state.secondUrl, description: this.state.description})
                .then(res => {
                    this.props.handleEdit(this.props._id, res.data)
                    this.props.edditToggle()
                })   
                .catch(err => console.dir(err))
            this.edditToggle()
            }else{
                alert("The Url for your image has not been created yet. please wait a few moments and try angain")
            }
    }

    cancel = () => {
        this.setState({
            title: this.props.title,
            description: this.props.description,
            beforePic: this.props.beforePic,
            afterPic: this.props.afterPic,
            toggle: false,
        })
        this.edditToggle()
    }

    progressBar = () => {
        if(this.state.selectedFile !== null && this.state.secondSelectedFiles !== null){
            return this.state.progress + this.state.secondProgress / 2
        }else if(this.state.selectedFile !== null){
            return this.state.progress
        }else if(this.state.secondSelectedFiles !== null){
            return this.state.secondProgress
        }else{
            return 0
        }
    }

    render(){
        return(
            <div className="galleryTextDiv">
                <h1 className="galleryTitle">{this.props.title}</h1>
                <div className="beforePic" style={{backgroundImage: `url(${this.props.beforePic})`}}></div>
                <div className="afterPic" style={{backgroundImage: `url(${this.props.afterPic})`}}></div>
                <h3 className="picDescription">Before</h3>
                <h3 className="picDescription">After</h3>
                <p className="galleryDescription" id="description">{this.props.description}</p>
                <button onClick={this.edditToggle} className={`edit-${this.state.toggle} button`}>Eddit</button>
                <button onClick={this.delete} className={`edit-${this.state.toggle} button`}>Delete</button>
                    <form className={`form-${this.state.toggle}`} onSubmit={this.handleSubmimt}>
                        <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleChange}/>
                        <div className="whitespace"></div>
                        <textarea rows="10" cols="40" name="description" value={this.state.description} placeholder="description" onChange={this.handleChange}/>
                        <div>
                            Progress for Photo upload:<progress value={this.progressBar()} max="100"/>
                        </div>
                        <div>
                            Before:<input type="file" onChange={this.flieSelectedHandler}/>
                        </div>
                        <div className="whitespace"></div>
                        <div>
                            After:<input type="file" onChange={this.secondFileUploadHandler}/>
                        </div>
                        <div className="editButtonRow">
                            <button onClick={this.handleClick} type="button" className="button">Upload</button>
                            <button type="submit" className="button">Submit</button>
                            <button onClick={this.cancel} type="button" className="button">Cancel</button>
                        </div>
                    </form>
            </div>
        )
    }
}

export default AdGalleryText