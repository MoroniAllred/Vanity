import React from "react"
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import Home from "./components/Home.js"
import Gallery from "./components/Gallery.js"
import AdminLogin from "./components/admin/AdminLogin.js"
import AdGallery from "./components/admin/adminInputs/AdGallery.js"
import {Route, Switch, Redirect} from "react-router-dom"
import {withAdmin} from "./context/AdminProvider.js"

const App= (props) => {
    const {token, admin, logout} = props
    return (
        <div>
            <Navbar/>
                <Switch>
                    <Route exact path="/" render={routerProps => <Home {...routerProps}/>}/>
                    <Route path="/gallery" render={routerProps => <Gallery {...routerProps}/>}/>
                    <Route path="/admin" render={routerProps => !token ?
                                                            <AdminLogin {...routerProps} />:
                                                            <Redirect to="/adGallery"/>
                                                            }/>
                    <Route path="/adGallery" render={routerProps => token ?
                                                            <AdGallery {...routerProps}/>:
                                                            <Redirect to="/admin"/>
                                                            }/>                                         
                </Switch>
            <Footer/>
        </div>
    )
}

export default withAdmin(App)