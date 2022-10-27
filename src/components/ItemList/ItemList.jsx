import React from 'react'
import "./item_list.scss"
import {Button, Table} from "react-bootstrap";

const ItemList = () => {
    return (
        <>
            <h2 className="text-white">Mis publicaciones</h2>
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
                <tr>
                    <td>1</td>
                    <td>Elden Ring</td>
                    <td>10-05-2022</td>
                    <td>PUBLICADO</td>
                    <td className="text-center item-ops">
                        <i className="fa-solid fa-2x fa-trash delete"></i> &nbsp;
                        <i className="fa-solid fa-2x fa-pen-to-square edit"></i> &nbsp;
                        <i className="fa-solid fa-2x fa-eye inspect"></i>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Boost a groove</td>
                    <td>04-03-2022</td>
                    <td>VENDIDO</td>
                    <td className="text-center item-ops">
                        <i className="fa-solid fa-2x fa-trash delete"></i> &nbsp;
                        <i className="fa-solid fa-2x fa-pen-to-square edit"></i> &nbsp;
                        <i className="fa-solid fa-2x fa-eye inspect"></i>
                    </td>
                </tr>
                </tbody>
            </Table>
        </>
    )
}

export default ItemList