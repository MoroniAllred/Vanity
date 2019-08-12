import React from "react"
import App from "./App"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import AdminProvider from "./context/AdminProvider.js"
import GalleryProvider from "./context/GalleryProvider.js"
import ScrollToTop from "./context/ScrollToTop.js"

ReactDOM.render(
    <BrowserRouter>
        <AdminProvider>
            <GalleryProvider>
                <ScrollToTop>
                    <App/>
                </ScrollToTop>
            </GalleryProvider>
        </AdminProvider>
    </BrowserRouter>,
 document.getElementById("root"))