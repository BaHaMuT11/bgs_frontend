import React, {useContext, useEffect} from "react"
import "./item_list.scss"
import {Table} from "react-bootstrap"
import {URL_DESHABILITAR_PUBLICACION, URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js";
import {UserContext} from "../../context/UserProvider.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import {ProductContext} from "../../context/ProductProvider.jsx";
import InterestedPeople from "../InterestedPeople/InterestedPeople.jsx";
import {URL_OBTENER_INTERESADOS} from "../../services/interesados.js";

const ItemList = () => {

    const {ntk, usuarioActivo} = useContext(UserContext)
    const { publicacionesUsuario, setPublicacionesUsuario, setMostrarInteresados,
            setInteresados} = useContext(ProductContext)

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

    useEffect( () => {
        asignarPublicaciones()
    }, [])

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Esta seguro que desea eliminar esta publicación?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'd33',
            cancelButtonColor: '#3085d6#',
            confirmButtonText: 'Procede y bórrala',
            cancelButtonText: 'Devolvámonos !'
        }).then((result) => {
            if (result.isConfirmed) {
                const eliminarPublicacion = async () => {

                    const reqDeshabilitarPublicacion = {
                        id: id
                    }
                    const configsItemList = {
                        headers: {
                            "Content-Type": "Application/JSON",
                            "Authorization": "Bearer " + ntk
                        }
                    }

                    try {
                        const {data} = await axios.put(URL_DESHABILITAR_PUBLICACION, reqDeshabilitarPublicacion, configsItemList)

                        if (data.estado.codigo == "200") {

                            asignarPublicaciones()

                            Swal.fire(
                                'SÚPER',
                                "Eliminaste tu publicación",
                                'success'
                            )
                        } else {
                            Swal.fire(
                                'Oh no !',
                                "No pudimos eliminar tu publicación. Reintenta más tarde",
                                'error'
                            )
                        }
                    }
                    catch (error) {
                        Swal.fire(
                            'Whooooops',
                            "Error de conexión con el servidor",
                            'error'
                        )
                    }

                }
                eliminarPublicacion()
            }
        })

    }
    const handleInspect = (idInteresado) => {
        const asignarInteresados = async () => {
            let configGetInterested= {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            try {
                const {data} = await axios.get(URL_OBTENER_INTERESADOS + idInteresado, configGetInterested)

                if (data.estado.codigo == "200") {
                    const listaInteresados = data.interesados

                    if (listaInteresados.length > 0) {
                        setInteresados(listaInteresados)
                        setMostrarInteresados(true)
                    } else {
                        Swal.fire(
                            'Espera !',
                            "Tu publicación aun no tiene interesados",
                            'error'
                        )
                    }
                } else {
                    Swal.fire(
                        'Whooooops',
                        "No se pudieron obtener los interesados, error de conexión",
                        'error'
                    )
                }
            }
            catch(error) {
                Swal.fire(
                    'Whooooops',
                    "No se pudieron obtener los interesados, error de conexión",
                    'error'
                )
            }
        }
        asignarInteresados()
    }


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
                                        <i className="fa-solid fa-2x fa-trash delete"
                                           onClick={ () => handleDelete(publicacion.id)}></i> &nbsp;
                                        <i className="fa-solid fa-2x fa-pen-to-square edit"></i> &nbsp;
                                        <i  onClick={ () => handleInspect(publicacion.id)}
                                            className="fa-solid fa-2x fa-eye inspect"></i>
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
            <InterestedPeople />
        </>
    )
}

export default ItemList