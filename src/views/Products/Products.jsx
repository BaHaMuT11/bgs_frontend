import React, {Suspense, useContext} from "react"
import "./products.scss"
import {Row, Col} from "react-bootstrap"
import BahaSpinner from "../../components/BahaSpinner/BahaSpinner.jsx"
import {ProductContext} from "../../context/ProductProvider.jsx"

const Hero = React.lazy(() => import("../../components/Hero/Hero.jsx"))
const MostVoted = React.lazy(() => import("../../components/MostVoted/MostVoted.jsx"))
const Catalog = React.lazy(() => import("../../components/Catalog/Catalog.jsx"))

const Products = () => {

    const {estadoFiltro} = useContext(ProductContext)

    return (
        <>
            <Row className="py-3">
                <Col>
                    <Suspense fallback={<BahaSpinner />}>
                        <Hero />
                    </Suspense>
                </Col>
            </Row>
            {
                estadoFiltro ?
                    ""
                    :
                    <Row>
                        <h2 className="display-6 text-white">Populares</h2>
                        <Suspense fallback={<BahaSpinner />}>
                            <MostVoted />
                        </Suspense>
                    </Row>
            }
            <Row>
                <h2 className="display-6 text-white">Catálogo</h2>
                <Suspense fallback={<BahaSpinner />}>
                    <Catalog />
                </Suspense>
            </Row>
        </>
    )
}

export default Products