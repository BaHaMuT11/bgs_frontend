import React, {useContext, useEffect} from "react"
import "./item_list.scss"
import {Table} from "react-bootstrap"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js";
import {UserContext} from "../../context/UserProvider.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import {ProductContext} from "../../context/ProductProvider.jsx";

const ItemList = () => {

    const {ntk, usuarioActivo} = useContext(UserContext)
    const {setPublicaciones, publicacionesUsuario, setPublicacionesUsuario} = useContext(ProductContext)

    useEffect( () => {

        const asignarPublicaciones = async () => {
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
                    setPublicaciones(items)

                    const asignarPublicacionesUsuario = () => {
                        let publis = []
                        for (const publicacion of items) {
                            if (publicacion.usuario == usuarioActivo.id && publicacion.estado != "DESACTIVADO") {
                                publis = [...publis, publicacion]
                            }
                        }
                        setPublicacionesUsuario(publis)
                    }
                    asignarPublicacionesUsuario()

                } else {
                    Swal.fire(
                        'Whooooops',
                        "No se pueden obtener tus publicaciones",
                        'error'
                    )
                }
            }
            catch (error) {
                Swal.fire(
                    'Whooooops',
                    "Hubo un error de conexión con el servidor",
                    'error'
                )
            }

        }
        asignarPublicaciones()

    }, [])

    return (
        <>
            <h2 className="text-white">Mis publicaciones</h2>
            {
                publicacionesUsuario.length > 0 ?
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Juego</th>
                            <th>Fecha de publicación</th>
                            <th>Estado</th>
                            <th>Operaciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            publicacionesUsuario.map( publicacion => (
                                <tr key={publicacion.id}>
                                    <td>{publicacion.id}</td>
                                    <td>{publicacion.juego}</td>
                                    <td>{new Date(publicacion.fechaCreacion).toLocaleDateString()}</td>
                                    <td>{publicacion.estado}</td>
                                    <td className="text-center item-ops">
                                        <i className="fa-solid fa-2x fa-trash delete"></i> &nbsp;
                                        <i className="fa-solid fa-2x fa-pen-to-square edit"></i> &nbsp;
                                        <i className="fa-solid fa-2x fa-eye inspect"></i>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    :
                    <div className="text-warning text-center">
                        <p>No tienes publicaicones aun</p>
                    </div>
            }


        </>
    )
}

export default ItemList