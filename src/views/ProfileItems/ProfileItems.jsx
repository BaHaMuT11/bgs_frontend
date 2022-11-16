import React from "react"
import "./profile_items.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import AddItem from "../../components/AddItem/AddItem.jsx"
import {Col, Row} from "react-bootstrap"
import ItemList from "../../components/ItemList/ItemList.jsx"

const ProfileItems = () => {
    return (
        <>
            <NavProfile />
            <Row className="mt-3 mb-5">
                <Col>
                    <AddItem />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <ItemList />
                </Col>
            </Row>
        </>
    )
}

export default ProfileItems