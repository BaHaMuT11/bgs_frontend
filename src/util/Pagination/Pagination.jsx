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
                    <>
                        {
                            props.actual == number ?
                                <li key={number} className='page-item'>
                                    <li onClick={() => props.paginate(number)} className="page-item">
                                        <a className="page-link active bg-dark" href="#pagi">{number}</a>
                                    </li>
                                </li>
                                :
                                <li key={number} className='page-item'>
                                    <li onClick={() => props.paginate(number)} className="page-item">
                                        <a className="page-link bg-dark" href="#pagi">{number}</a>
                                    </li>
                                </li>
                        }
                    </>
                ))}

            </ul>
        </nav>
    )
}

export default Pagination