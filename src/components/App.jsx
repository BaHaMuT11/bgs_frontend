import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../views/Layout/Layout.jsx";
import Products from "../views/Products/Products.jsx";
import ProfileInfo from "../views/ProfileInfo/ProfileInfo.jsx";
import ProfileMyGames from "../views/ProfileMyGames/ProfileMyGames.jsx";
import ProfileItems from "../views/ProfileItems/ProfileItems.jsx";
import ProfileWishlist from "../views/ProfileWishlist/ProfileWishlist.jsx";
import Login from "../views/Login/Login.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Products />} />

                    <Route path="profile/mygames" element={<ProfileMyGames />} />
                    <Route path="profile/wishlist" element={<ProfileWishlist />} />
                    <Route path="profile/items" element={<ProfileItems />} />
                    <Route path="profile/info" element={<ProfileInfo />} />

                    <Route path="authenticate" element={<Login />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App