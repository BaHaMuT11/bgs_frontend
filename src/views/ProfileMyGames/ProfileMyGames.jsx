import React from 'react'
import "./profile_my_games.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx";
import {Button, Table} from "react-bootstrap";

const ProfileMyGames = () => {

    const games = [
        {
            id: 1,
            juego: "Elden Ring",
            fechaCompra: "16-06-2022",
            vendedor: "Loreto Bustos"
        },
        {
            id: 2,
            juego: "Final Fantasy VIII",
            fechaCompra: "04-05-2022",
            vendedor: "Ibar Rojas"
        },
        {
            id: 3,
            juego: "Resident Evil VII",
            fechaCompra: "05-03-2020",
            vendedor: "Soledad Fierro"
        },
        {
            id: 4,
            juego: "Amnesia",
            fechaCompra: "25-12-2021",
            vendedor: "Enzo Vidal"
        }
    ]


    return (
        <div>
            <NavProfile />
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
                    games.map(game => (
                        <tr>
                            <td>{game.id}</td>
                            <td>{game.juego}</td>
                            <td>{game.fechaCompra}</td>
                            <td>{game.vendedor}</td>
                            <td className="text-center">
                                <Button variant="warning">Detalle</Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileMyGames