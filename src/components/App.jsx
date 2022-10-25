import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../views/Layout/Layout.jsx";
import Products from "../views/Products/Products.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App