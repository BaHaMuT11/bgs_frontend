import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import {Outlet} from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar.jsx"
import "./layout.scss"
import Footer from "../../components/Footer/Footer.jsx"

const Layout = () => {
    return (
        <>
            <Container fluid className="g-0">
                <Row>
                    <Col>
                        <header>
                            <Navbar />
                        </header>
                    </Col>
                </Row>
            </Container>
            <Container fluid="xxl" className="m-antifix">
                <Outlet />
            </Container>
            <Container fluid className="g-0">
                <Row>
                    <Col>
                        <footer>
                            <Footer />
                        </footer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Layout