import React, {useContext, useEffect} from "react"
import {Accordion} from "react-bootstrap"
import "./item_accordion.scss"
import {Link, useParams} from "react-router-dom";
import {UserContext} from "../../context/UserProvider.jsx";
import {ProductContext} from "../../context/ProductProvider.jsx";
import axios from "axios";
import {URL_BUSCAR_PUBLICACION_ID} from "../../services/publicaciones.js";
import Swal from "sweetalert2";
import {URL_BUSCAR_USUARIO_ID} from "../../services/auth.js";
import {obtenerCLP} from "../../util/clp_parser.js";

const ItemAccordion = () => {

    const {id} = useParams()
    const {usuarioActivo, ntk, vendedor, setVendedor, autenticado} = useContext(UserContext)
    const {publicacionActiva, setPublicacionActiva} = useContext(ProductContext)

    useEffect( () => {
        const obtenerPublicacionActiva = async () => {

            try {
                const {data} = await axios.get(URL_BUSCAR_PUBLICACION_ID + id)

                if (data.estado.codigo == "200") {
                    const item = data.publicacion
                    setPublicacionActiva(item)

                   if (autenticado) {
                       const obtenerVendedor= async () => {
                           const configObtenerVendedor = {
                               headers: {
                                   "Content-Type": "Application/JSON",
                                   "Authorization": "Bearer " + ntk
                               }
                           }
                           try {
                               const {data} = await axios.get(URL_BUSCAR_USUARIO_ID + item.usuario, configObtenerVendedor)
                               setVendedor(data.usuario)
                           }
                           catch(error) {
                               console.log(error)
                               Swal.fire(
                                   'Whooooops',
                                   "No se pudo obtener el vendedor, intenta más tarde",
                                   'error'
                               )
                           }
                       }
                       obtenerVendedor()
                   }
                } else {
                    Swal.fire(
                        'Whooooops',
                        "No se pudo obtener la publicación, intente más tarde",
                        'error'
                    )
                }
            }
            catch (error) {
                Swal.fire(
                    'Whooooops',
                    "Error de conexión, intente más tarde",
                    'error'
                )
            }
        }
        obtenerPublicacionActiva()
    }, [])

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{publicacionActiva.juego}- ID: {id}</Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                    <div className="product-hero">
                        <img src={publicacionActiva.imagen} alt={publicacionActiva.juego} className="pb-3" />
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html: publicacionActiva.descripcion}}></div>
                    <p>
                        <span className="descriptor">Formato:</span>
                        <span className="info">{publicacionActiva.formato}</span>
                    </p>
                    <p>
                        <span className="descriptor">Plataforma:</span>
                        <span className="info">{publicacionActiva.plataforma}</span>
                    </p>
                    <p className="display-6 text-center detail-precio">{obtenerCLP(publicacionActiva.precio)}</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Partes interesadas</Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                    {
                        autenticado ?
                            <>
                                <div className="vendedor mb-5">
                                    <h2 className="display-6">Vendedor</h2>
                                    <p>
                                        <span className="descriptor">Nombre:</span>
                                        <span className="info">{vendedor.nombre}</span>
                                    </p>
                                    <p>
                                        <span className="descriptor">Región:</span>
                                        <span className="info">{vendedor.region}</span>
                                    </p>
                                    <p>
                                        <span className="descriptor">Valoración:</span>
                                        <span className="info">{vendedor.sellerRating}</span>
                                    </p>
                                </div>
                                {
                                    usuarioActivo.id == vendedor.id ?
                                        <div className="text-white">
                                            <h2 className="display-6">Prospecto</h2>
                                            <p>Esta es tu publicación !! &nbsp; ;)</p>
                                        </div>
                                        :
                                        <div className="comprador">
                                            <h2 className="display-6">Prospecto</h2>
                                            <p>
                                                <span className="descriptor">Nombre:</span>
                                                <span className="info">{usuarioActivo.nombre}</span>
                                            </p>
                                            <p>
                                                <span className="descriptor">Región:</span>
                                                <span className="info">{usuarioActivo.region}</span>
                                            </p>
                                        </div>
                                }
                            </>
                            :
                            <div className="text-white">
                                <p>
                                    Si estas interesado en comprar este artīculo,
                                    <Link to="/authenticate" className="text-info"> <u>regístrate o inicia sesión</u></Link>
                                </p>
                            </div>
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default ItemAccordion