import React, { useEffect, useState } from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {

  const [number] = useState("")
  const [a] = useState("")

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className={number ? 'page-selected' : null} >
              <a onClick={() => paginate(number)} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
}
export default Pagination;

