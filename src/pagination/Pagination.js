import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  const styles = {
    selected:{
      backgroundColor: "#463fa0",
      padding: "1px 6px",
      borderRadius: "15px",
      
    }
  };

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul style={{display: 'flex',
    color:'white',
    listStyleType: 'none',
    gap: '20px',
  justifyContent:'end', cursor: 'pointer',backgroundColor:'#171d32',fontSize:'11px'}}
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li style={{}}
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange && paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li  className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li 
            className={classnames('pagination-item')}
            onClick={() => onPageChange(pageNumber)}
            style={(pageNumber === currentPage) ? styles.selected: {}}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;