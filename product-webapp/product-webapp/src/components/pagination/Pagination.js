// import React, { useEffect, useState } from "react";

// function Pagination({ postsPerPage, totalPosts, paginate }) {

//   const [number] = useState("")
//   const [a] = useState("")

//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//       pageNumbers.push(i);
//     }
  
//     return (
//       <nav>
//         <ul className='pagination'>
//           {pageNumbers.map(number => (
//             <li key={number} className={number ? 'page-selected' : null} >
//               <a onClick={() => paginate(number)} className='page-link'>
//                 {number}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     );
// }
// export default Pagination;

import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './UsePagination';
import './Pagination.scss';
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;


