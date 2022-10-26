import React from 'react'
import "./profile_my_games.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx";
import {Button, Table} from "react-bootstrap";

const ProfileMyGames = () => {
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
                    <tr>
                        <td>1</td>
                        <td>Elden Ring</td>
                        <td>10-06-2022</td>
                        <td>Loreto Bustos</td>
                        <td className="text-center">
                            <Button variant="warning">Detalle</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Final Fantasy VIII</td>
                        <td>04-05-2022</td>
                        <td>Ibar Rojas</td>
                        <td className="text-center">
                            <Button variant="warning">Detalle</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileMyGames