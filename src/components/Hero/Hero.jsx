import React from 'react'
import "./hero.scss"
import {Carousel} from "react-bootstrap";
import GotamKnights from "../../assets/img/gotamknights.jpg";
import JurassicPark from "../../assets/img/dino.jpg";
import SackboyAdventures from "../../assets/img/sackboy.jpg";

const Hero = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={GotamKnights}
                        alt="Gotam Knights"
                    />
                    <Carousel.Caption>
                        <h3>Gotham Knights</h3>
                        <p>Uno de los juegos más poleémicos actualmente. ¿Te unes?</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={SackboyAdventures}
                        alt="Sackboy Adventures"
                    />
                    <Carousel.Caption>
                        <h3>Sackboy</h3>
                        <p>Las aventuras de sackboy, ahora disponible para plataformas de última generación</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={JurassicPark}
                        alt="Jurassic Park"
                    />
                    <Carousel.Caption>
                        <h3>Parque Jurásico</h3>
                        <p>El parque en su versión renovada. ¿Quieres entrar?</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Hero