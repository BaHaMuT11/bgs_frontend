import React from "react"
import {Accordion} from "react-bootstrap"
import "./item_accordion.scss"
import EldenRing from "../../assets/img/elden_ring.png"
import {useParams} from "react-router-dom";

const ItemAccordion = () => {

    const {id} = useParams()

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Vendo clave de Elden Ring para Steam - ID: {id}</Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                    <div className="product-hero">
                        <img src={EldenRing} alt="Elden Ring" className="pb-3" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <p>
                        <span className="descriptor">Formato:</span>
                        <span className="info">Digital</span>
                    </p>
                    <p>
                        <span className="descriptor">Plataforma:</span>
                        <span className="info">XBOX</span>
                    </p>
                    <p className="display-6 text-center detail-precio">$51.000</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Partes interesadas</Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                    <div className="vendedor mb-5">
                        <h2 className="display-6">Vendedor</h2>
                        <p>
                            <span className="descriptor">Nombre:</span>
                            <span className="info">Leonardo Castillo</span>
                        </p>
                        <p>
                            <span className="descriptor">Región:</span>
                            <span className="info">Aysén</span>
                        </p>
                        <p>
                            <span className="descriptor">Valoración:</span>
                            <span className="info">4.2/5</span>
                        </p>
                    </div>
                    <div className="comprador">
                        <h2 className="display-6">Comprador</h2>
                        <p>
                            <span className="descriptor">Nombre:</span>
                            <span className="info">Gonzalo Flemming</span>
                        </p>
                        <p>
                            <span className="descriptor">Región:</span>
                            <span className="info">Metropolitana</span>
                        </p>
                        <p>
                            <span className="descriptor">Valoración:</span>
                            <span className="info">4.2/5</span>
                        </p>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default ItemAccordion