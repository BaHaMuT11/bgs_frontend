import React from 'react'
import "./profile_info.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx";
import {Button, Image} from "react-bootstrap";
import Baha from "../../assets/img/baha.jpg"

const ProfileInfo = () => {
    return (
        <div>
            <NavProfile />
            <div className="profile">
                <Image src={Baha} roundedCircle={true} />
                <h2 className="display-5 text-white">Raúl Pardo Zurita</h2>
            </div>
            <div className="profile-info text-white pb-3">
                <p>
                    <span className="descriptor">Dirección:</span>
                    <span className="info">Los Paltos #1515, RM</span>
                </p>
                <p>
                    <span className="descriptor">Login:</span>
                    <span className="info">baha25</span>
                </p>
                <p>
                    <span className="descriptor">Fono:</span>
                    <span className="info">+56 9 4852 8847</span>
                </p>
                <p>
                    <span className="descriptor">Edad:</span>
                    <span className="info">36</span>
                </p>
                <div className="text-center">
                    <Button variant="warning">Editar info</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo