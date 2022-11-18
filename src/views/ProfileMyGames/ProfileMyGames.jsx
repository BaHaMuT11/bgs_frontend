import React, {useContext, useEffect} from "react"
import "./profile_my_games.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Button, Table} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {URL_OBTENER_ADQUISICIONES} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import {ProductContext} from "../../context/ProductProvider.jsx"

const ProfileMyGames = () => {

    const {ntk, usuarioActivo} = useContext(UserContext)
    const {adquisiciones, setAdquisiciones} = useContext(ProductContext)
    const navigate = useNavigate()

    useEffect( () => {
        const asignarAdquisiciones = async () => {

            const configGetAdquisiciones= {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            try {
                const {data} = await axios.get(URL_OBTENER_ADQUISICIONES + usuarioActivo.id, configGetAdquisiciones)
                if (data.estado.codigo == "200") {
                    setAdquisiciones(data.adquisiciones)
                } else {
                    Swal.fire(
                        'Whooooops',
                        "No pudimos obtener tus aduisiciones, error de conexión",
                        'error'
                    )
                }
            }
            catch(error) {
                Swal.fire(
                    'Whooooops',
                    "No pudimos obtener tus aduisiciones, error de conexión",
                    'error'
                )
            }

        }
        asignarAdquisiciones()
    }, [])

    const handleRedirect = (id) => {
        navigate(`/detail/${id}`)
    }

    return (
        <div className="mygames-wrapper">
            <NavProfile />
            {
                adquisiciones.length > 0 ?
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Juego</th>
                            <th>Fecha de compra</th>
                            <th>Vendedor</th>
                            <th>Operaciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            adquisiciones.map(game => (
                                <tr key={game.idPublicacion}>
                                    <td>{game.idPublicacion}</td>
                                    <td>{game.juego}</td>
                                    <td>{new Date(game.fechaCompra).toLocaleDateString("es-CL")}</td>
                                    <td>{game.vendedor}</td>
                                    <td className="text-center">
                                        <Button variant="warning"
                                                onClick={() => handleRedirect(game.idPublicacion)}>Detalle</Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    :
                    <div className="text-warning text-center my-5">
                        <p>No has comprado nada aún</p>
                    </div>
            }
        </div>
    )
}

export default ProfileMyGames