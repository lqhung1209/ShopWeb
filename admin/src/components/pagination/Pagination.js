import React from 'react';

import { useNavigate } from 'react-router-dom';

import Pagination from 'react-bootstrap/Pagination';

const Paginate = props => {
  const navigate = useNavigate();

  let pageArray = [];
  for (let i = 1; i <= props.totalPage; i++) {
    pageArray = [...pageArray, i];
  }

  return (
    <Pagination style={{ justifyContent: 'center' }}>
      {/* nếu page = 1 thì ẩn nút prev */}
      {props.pageNumber === 1 ? (
        ''
      ) : (
        <Pagination.Prev
          onClick={() =>
            navigate(
              `/${!props.belongTo ? `page=${props.pageNumber - 1}` : ''}`,
              {
                replace: true,
              }
            )
          }
        />
      )}
      {pageArray.map(e => (
        <Pagination.Item
          onClick={() =>
            navigate(`/${!props.belongTo ? `page=${e}` : ''}`, {
              replace: true,
            })
          }
          disabled={props.pageNumber === e ? true : false}
        >
          {e}
        </Pagination.Item>
      ))}
      {/* nếu page cuối thì ẩn nút next */}
      {props.pageNumber === props.totalPage ? (
        ''
      ) : (
        <Pagination.Next
          onClick={() =>
            navigate(
              `/${!props.belongTo ? `page=${props.pageNumber + 1}` : ''}`,
              {
                replace: true,
              }
            )
          }
        />
      )}
    </Pagination>
  );
};

export default Paginate;
