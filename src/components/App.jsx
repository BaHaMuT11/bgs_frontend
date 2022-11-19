import React, {useContext} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import Layout from "../views/Layout/Layout.jsx"
import Products from "../views/Products/Products.jsx"
import ProfileInfo from "../views/ProfileInfo/ProfileInfo.jsx"
import ProfileMyGames from "../views/ProfileMyGames/ProfileMyGames.jsx"
import ProfileItems from "../views/ProfileItems/ProfileItems.jsx"
import ProfileWishlist from "../views/ProfileWishlist/ProfileWishlist.jsx"
import Login from "../views/Login/Login.jsx"
import ProductDetail from "../views/ProductDetail/ProductDetail.jsx"
import {UserContext} from "../context/UserProvider.jsx"
import NotFound from "../views/NotFound/NotFound.jsx"

const App = () => {

    const {autenticado} = useContext(UserContext)

    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<Products />} />

                <Route path='*' element={<NotFound />} />

                <Route path="profile/mygames" element= {!autenticado ? <Navigate to="/" />: <ProfileMyGames />} />
                <Route path="profile/wishlist" element={!autenticado ? <Navigate to="/" />: <ProfileWishlist />} />
                <Route path="profile/items" element={!autenticado ? <Navigate to="/" />: <ProfileItems />} />
                <Route path="profile/info" element={!autenticado ? <Navigate to="/" />: <ProfileInfo />} />

                <Route path="authenticate" element={<Login />} />
                <Route path="detail/:id" element={<ProductDetail />} />

            </Route>
        </Routes>
    )
}

export default App