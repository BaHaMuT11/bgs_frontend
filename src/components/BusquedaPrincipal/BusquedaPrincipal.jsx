import React, {useContext} from "react"
import "./busqueda_principal.scss"
import {Form} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import {ProductContext} from "../../context/ProductProvider.jsx"
import {emparejarCadena} from "../../util/emparejar.js"
import axios from "axios"
import Swal from "sweetalert2"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js"

const BusquedaPrincipal = () => {

    const {
        setPublicaciones,
        setEstadoFiltro,
        setInputFiltro,
        inputFiltro
    } = useContext(ProductContext)

    const {ntk} = useContext(UserContext)


    const handleOps = (term) => {
        if (term === "") {
            setEstadoFiltro(false)
        } else {
            setEstadoFiltro(true)
        }
    }

    const handleSearch = e => {
        let term = e.target.value
        setInputFiltro(term)
        handleOps(term)

        const obtenerPublicaciones = async () => {
            const configsItemList = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }

            try {
                const {data} = await axios.get(URL_OBTENER_PUBLICACIONES, configsItemList)

                if (data.estado.codigo == "200") {

                    const items = data.publicaciones

                    let publis = []

                    for (let publicacion of items) {

                        if (publicacion.estado != "DESACTIVADO" && publicacion.estado != "VENDIDO") {
                            publis = [...publis, publicacion]
                        }
                    }
                    publis.sort((a, b) => (b.id - a.id))

                    return publis
                } else {
                    Swal.fire(
                        'Whooooops',
                        "No se pueden obtener las publicaciones",
                        'error'
                    )
                }
                return
            } catch (error) {
                Swal.fire(
                    'Whooooops',
                    "Hubo un error de conexión con el servidor",
                    'error'
                )
                return
            }
        }

        const filtrarPublicaciones = async () => {
            let publicacionesReplica = await obtenerPublicaciones()
            let publicacionesFiltradas = publicacionesReplica.filter(publicacion => emparejarCadena(publicacion.juego).includes(emparejarCadena(term)))
            setPublicaciones(publicacionesFiltradas)
        }
        filtrarPublicaciones()
    }

    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Busca tu juego"
                className="me-1"
                aria-label="Search"
                value={inputFiltro}
                onChange={e => handleSearch(e)}
            />
        </Form>
    )
}

export default BusquedaPrincipal