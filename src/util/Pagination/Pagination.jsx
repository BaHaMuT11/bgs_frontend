import React from "react"
import "./pagination.scss"

const Pagination = (props) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav id="pagi">
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                    <React.Fragment key={number}>
                        {
                            props.actual == number ?
                                <li onClick={() => props.paginate(number)} className="page-item">
                                    <a className="page-link active bg-dark" href="#pagi">{number}</a>
                                </li>
                                :
                                <li onClick={() => props.paginate(number)} className="page-item">
                                    <a className="page-link bg-dark" href="#pagi">{number}</a>
                                </li>
                        }
                    </React.Fragment>
                ))}

            </ul>
        </nav>
    )
}

export default Pagination