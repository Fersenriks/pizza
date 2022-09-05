import React from 'react';
import classes from '../../pages/Home/HomePage.module.scss';
import ReactPaginate from 'react-paginate';

const Paginator = ({ ...restProps }) => {
  return (
    <ReactPaginate
      className={classes.paginator}
      breakLabel='...'
      nextLabel='>'
      pageRangeDisplayed={5}
      previousLabel='<'
      renderOnZeroPageCount={null}
      {...restProps}
    />
  );
};

export default Paginator;
