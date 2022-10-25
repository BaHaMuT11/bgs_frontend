import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import "./assets/css/index.scss"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
