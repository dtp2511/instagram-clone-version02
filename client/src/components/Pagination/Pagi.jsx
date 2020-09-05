import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const Pagi = ({ pages, setCurrentPage }) => {
  const topFunction = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <Pagination
        onChange={(e, page) => {
          topFunction();
          setCurrentPage(page);
        }}
        count={pages}
        color='primary'
      />
    </div>
  );
};

export default Pagi;
