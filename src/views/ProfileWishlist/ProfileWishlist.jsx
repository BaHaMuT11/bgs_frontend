import React, {useContext, useEffect} from "react"
import "./profile_wishlist.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Row} from "react-bootstrap"
import Favorite from "../../components/Favorite/Favorite.jsx"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_OBTENER_FAVORITOS_USUARIO} from "../../services/favoritos.js"
import Swal from "sweetalert2"
import {ProductContext} from "../../context/ProductProvider.jsx"

const ProfileWishlist = () => {

    const {ntk, usuarioActivo} = useContext(UserContext)
    const {favoritos, setFavoritos} = useContext(ProductContext)

    const asignarFavoritos = async () => {
        const configObtFavs = {
            headers: {
                "Content-Type": "Application/JSON",
                "Authorization": "Bearer " + ntk
            }
        }
        try {
            const {data} =  await axios.get(URL_OBTENER_FAVORITOS_USUARIO + usuarioActivo.id, configObtFavs)

            if (data.estado.codigo == "200") {
                console.log(data.favoritos)
                setFavoritos(data.favoritos.filter(fav => (fav.estado !== "VENDIDO" && fav.estado !== "DESACTIVADO")))
            } else {
                Swal.fire(
                    'Whooooops',
                    "No se pueden obtener los favoritos",
                    'error'
                )
            }
        }
        catch (error) {
            Swal.fire(
                'Whooooops',
                "Error al obtener los favoritos",
                'error'
            )
        }
    }

    useEffect( () => {
        asignarFavoritos()
    },[])

    return (
        <div className="wishlist-wrapper">
            <NavProfile />
            <div className="mx-2">
                {
                    favoritos.length > 0 ?
                        <Row>
                            {
                                favoritos.map( favorito => (
                                    <Favorite url={favorito.imagen}
                                              nombre={favorito.juego}
                                              idUsuario={favorito.usuario}
                                              idPublicacion={favorito.publicacion}
                                              actualizarFavoritos={asignarFavoritos}
                                              key={favorito.publicacion} />
                                ))
                            }
                        </Row>
                        :
                        <Row>
                            <div className="text-warning text-center my-5">
                                <p>No tienes favoritos aún</p>
                            </div>
                        </Row>
                }
            </div>
        </div>
    )
}

export default ProfileWishlist