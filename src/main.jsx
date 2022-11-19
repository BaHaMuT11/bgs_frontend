import React from "react"
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import "./assets/css/index.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import UserProvider from "./context/UserProvider.jsx"
import ProductProvider from "./context/ProductProvider.jsx"
import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
        <ProductProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ProductProvider>
    </UserProvider>
  </React.StrictMode>
)
