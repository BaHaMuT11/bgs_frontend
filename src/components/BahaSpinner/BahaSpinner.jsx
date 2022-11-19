import React from "react"
import "./baha_spinner.scss"
import {RingLoader} from "react-spinners"

const BahaSpinner = () => {
    return (
        <div className="text-white d-flex justify-content-center">
            <RingLoader color="#6af962" size={50} />
        </div>
    )
}

export default BahaSpinner