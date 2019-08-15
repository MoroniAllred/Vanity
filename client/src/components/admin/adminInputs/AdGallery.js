import React, {Component} from "react"
import {withAdmin} from "../../../context/AdminProvider"
import axios from "axios"
import {storage} from "../../../firebase/index.js"
import AdGalleryText from "./AdGalleryText"

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
            description: "",
            pictures: [],
            showSubmit: false
        }
    }

    componentDidMount = () =>{
        axios.get("/pictures")
    .then((res) => this.setState({
        pictures: res.data
    }))
        .catch((err) => console.log(err))

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
            alert("both file filds must be filled in before you can submit your upload")
        }
        }
    
    cancelUpload = () => {
        this.setState({
            url: "",
            secondUrl: "",
            title: "",
            description: "",
            showSubmit: false,
            progress: 0,
            secondProgress: 0,
        })
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
                if(this.state.secondUrl !== ""){
                    this.setState({
                        showSubmit: true
                    })
                }
                this.setState({
                    url: url
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
                secondProgress: progress
            })
        }, (error) => {
            //error fun ction
            console.log(error)
        }, 
        () => {
            //compete function
            storage.ref("secondGallery").child(this.state.secondSelectedFiles.name).getDownloadURL().then(url => {
                if(this.state.url !== ""){
                    this.setState({
                        showSubmit: true
                    })
                }
                this.setState({
                    secondUrl: url
                })
            })
        });
    }
    
        handleSubmimt = () => {
            if(this.state.title !== "" && this.state.description !== ""){
            axios.post("/pictures", {title: this.state.title, beforePic: this.state.url, afterPic: this.state.secondUrl, description: this.state.description})
                .then((res)=>{
                    this.setState({
                        progress: 0,
                        secondProgress: 0,
                        url: "",
                        secondUrl: "",
                        title: "",
                        description: "",
                        showSubmit: false,
                    })
                    this.setState( prevState => {
                        return {pictures: [...prevState.pictures, res.data]}
                })})
                .catch(err => console.dir(err))
            }else{
                alert("All input must contain content")
            }
        }

        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleDelet = (id) => {
            this.setState({
                pictures: this.state.pictures.filter(picture => {
                    return picture._id !== id  
                })
            })
        }

        handleEdit = (id, updated) => {
            this.setState( prevState => {
                const i = prevState.pictures.findIndex(picture => {
                    return picture._id === id
                })
                return {pictures: [...prevState.pictures.slice(0, i), updated, ...prevState.pictures.slice(i+1)]}
            })
        }

        // componentDidUnmount = () => {
        //     this.props.logout()
        // }

    render(){
        const mappedPictures = this.state.pictures.map(pic => <AdGalleryText {...pic} key={pic._id} handleDelet={this.handleDelet} handleEdit={this.handleEdit} fileClear={this.fileClear}/>)

        return(
            <div>
                <div className="postForm">
                    <div>
                        <button onClick={this.props.logout} className="logoutButton">LogOut</button>
                    </div>
                    Progress for Photo upload:<progress value={(this.state.progress  + this.state.secondProgress) / 2 - 10} max="100"/>
                    <div className="whitespace">
                        <p>After the upload is complete you will need to hit submit to finish adding the new info to your gallery.</p>
                    </div>
                        <form>
                            <div className="typeFeild">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title" required/>
                                <div className="whitespace"></div>
                                <textarea rows="10" cols="60" name="description" value={this.state.description} onChange={this.handleChange} placeholder="description"/>
                            </div>
                        </form>
                    <div className="whitespace">
                        <div>Input before image:<input type="file" onChange={this.flieSelectedHandler}/></div>
                    </div>
                    <div className="whitespace">
                        <div>Input after image:<input type="file" onChange={this.secondFileUploadHandler}/></div>
                    </div>
                    <div className="whitespace">
                        <div>
                            <button onClick={this.cancelUpload} className="button">Cancel</button>
                            <button onClick={this.handleClick} className={`showUpload-${this.state.showSubmit} button`}>Upload</button>
                            <button onClick={this.handleSubmimt} className={`showSubmit-${this.state.showSubmit} button finishButton`}>Finish</button>
                        </div>  
                    </div>
                </div>
                <div className="center">
                    <div className="galleryDiv">
                        {mappedPictures}
                    </div>
                </div>
            </div>
        )
    }
}

export default withAdmin(AdGallery)