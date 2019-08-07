import React, {Component} from "react"
import LoginForm from "./LoginForm"
import {withAdmin} from "../../context/AdminProvider.js"

class AdminLogin  extends Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = e => {
        e.preventDefault()
        const adminCredentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(adminCredentials)
    }
    
    render(){
        return(
            <div>
                <LoginForm 
                    username = {this.state.username}
                    password = {this.state.password}
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleLogin}/>
                <p>{this.props.errMsg}</p>
            </div>
        )
    }
}

export default withAdmin(AdminLogin)