import React from 'react';

import ReactPaginate from 'react-paginate';
import classes from '../../pages/Home/HomePage.module.scss';

type PaginatorProps = {
  onPageChange: any;
  pageCount: number;
};

const Paginator: React.FC<PaginatorProps> = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      className={classes.paginator}
      breakLabel='...'
      nextLabel='>'
      pageRangeDisplayed={5}
      previousLabel='<'
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
};

export default Paginator;
