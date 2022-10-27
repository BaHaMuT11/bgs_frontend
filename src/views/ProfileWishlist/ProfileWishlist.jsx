import React from 'react'
import "./profile_wishlist.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Row} from "react-bootstrap"
import Favorite from "../../components/Favorite/Favorite.jsx"
import EldenRing from "../../assets/img/elden_ring.png"
import GodOfWar from "../../assets/img/gordo_ragnarok.png"
import Batman from "../../assets/img/gotamknights.jpg"

const ProfileWishlist = () => {
    return (
        <div>
            <NavProfile />
            <Row>
                <Favorite url={EldenRing} nombre="Elden Ring"/>
                <Favorite url={GodOfWar} nombre="God of War: Ragnarok"/>
                <Favorite url={Batman} nombre="Gotham Knights"/>
            </Row>
        </div>
    )
}

export default ProfileWishlist