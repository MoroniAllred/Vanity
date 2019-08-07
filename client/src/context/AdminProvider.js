import React, {Component} from "react"
import axios from "axios"

const AdminContext = React.createContext()

class AdminProvider extends Component {
    constructor(){
        super()
        this.state = {
            admin: JSON.parse(localStorage.getItem("admin")) || {},
            token: localStorage.getItem("token") || "",
            errMsg: ""
        }
    }

    login = credentials => {
        axios.post("/admin/login", credentials)
            .then(res => {
                console.log(res.data)
                const { admin, token } = res.data
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.setState({ admin, token })
            })
            .catch(err => { 
                console.dir(err)
                this.handleAdminLoginErr(err.response.data.errMsg)
            })
    }

    handleAdminLoginErr = (errMsg) => {
        this.setState({errMsg})
    }

    logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({ user: {}, token: ""})
    }

    render(){
        return (
            <AdminContext.Provider
                value={{
                    admin: this.state.user,
                    token: this.state.token,
                    login: this.login,
                    logout: this.logout,
                    errMsg: this.state.errMsg
                }}>
                {this.props.children}
            </AdminContext.Provider>
        )
    }
}

export const withAdmin = C => props => (
    <AdminContext.Consumer>
        {value => <C {...value} {...props}/>}
    </AdminContext.Consumer>
)

export default AdminProvider