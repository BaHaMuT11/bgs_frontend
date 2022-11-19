import React, {useContext, useEffect} from "react"
import {Accordion} from "react-bootstrap"
import "./item_accordion.scss"
import {Link, useNavigate, useParams} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx"
import {ProductContext} from "../../context/ProductProvider.jsx"
import axios from "axios"
import {URL_BUSCAR_PUBLICACION_ID} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import {URL_BUSCAR_USUARIO_ID} from "../../services/auth.js"
import {obtenerCLP} from "../../util/clp_parser.js"
import {URL_AGREGAR_FAVORITO} from "../../services/favoritos.js"
import {URL_MOSTRAR_INTERES} from "../../services/interesados.js"

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

    const handleAddFavorite = () => {
        const agregarFavorito = async () => {

            const configAddFav = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            const reqAddFav = {
                usuario: usuarioActivo.id,
                publicacion: publicacionActiva.id
            }

            try {
                const {data} = await axios.post(URL_AGREGAR_FAVORITO, reqAddFav, configAddFav)

                if (data.estado.codigo == "200") {
                    Swal.fire(
                        'Excelente',
                        "Agregaste la publicación a tus favoritos",
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Epaa',
                        "El servidor no responde, inténtalo más tarde",
                        'error'
                    )
                }
            }
            catch(error) {
                Swal.fire(
                    'Oye !',
                    "Esta publicación ya estaba en tus favoritos o hay problemas de conexión",
                    'error'
                )
            }
        }
        agregarFavorito()
    }
    const handleShowInterest = () => {
        const mostrarInteres = async () => {

            const configMostrarInteres = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            const reqMostrarInteres = {
                usuario: usuarioActivo.id,
                publicacion: publicacionActiva.id
            }

            try {
                const {data} = await axios.post(URL_MOSTRAR_INTERES, reqMostrarInteres, configMostrarInteres)

                if (data.estado.codigo == "200") {
                    Swal.fire(
                        'Excelente decisión !',
                        "Suerte con la compra",
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Epaa',
                        "El servidor no responde, inténtalo más tarde",
                        'error'
                    )
                }
            }
            catch(error) {
                Swal.fire(
                    'Qué ansiedad !',
                    "Ya mostraste interés en esta publicación",
                    'error'
                )
            }
        }
        mostrarInteres()
    }

    return (
        <div className="accordion-wrapper">
            {
                publicacionActiva.estado !== "DESACTIVADO" ?
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
                                                    {
                                                        vendedor.sellerRating > 0 ?
                                                            <span className="info">{vendedor.sellerRating}</span>
                                                            :
                                                            <span className="info">Sin valoración</span>
                                                    }
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
                                            {
                                                usuarioActivo.id == publicacionActiva.usuario ?
                                                    ""
                                                    :
                                                    <div className="text-center mt-4">
                                                        {
                                                            publicacionActiva.estado == "VENDIDO" ?
                                                                <>
                                                                    <button className="btn btn-danger" onClick={ () => handleAddFavorite()} disabled>
                                                                        <i className="fa-solid fa-star"></i> Agregar a favoritos
                                                                    </button> &nbsp; &nbsp;
                                                                    <button className="btn btn-warning" onClick={ () => handleShowInterest()} disabled>
                                                                        <i className="fa-solid fa-id-card"></i> Mostrar interés
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button className="btn btn-danger" onClick={ () => handleAddFavorite()}>
                                                                        <i className="fa-solid fa-star"></i> Agregar a favoritos
                                                                    </button> &nbsp; &nbsp;
                                                                    <button className="btn btn-warning" onClick={ () => handleShowInterest()}>
                                                                        <i className="fa-solid fa-id-card"></i> Mostrar interés
                                                                    </button>
                                                                </>
                                                        }
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
                    :
                    <div className="text-warning text-center">
                        <p>Esta publicación fue eliminada</p>
                    </div>
            }
        </div>
    )
}

export default ItemAccordion