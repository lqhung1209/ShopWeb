import React from 'react';

const OrderDetailList = props => {
  const product = props.product;

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }

  return (
    <tr>
      <td>{product._id}</td>
      <td>
        <img
          src={
            product.img1.slice(0, 7).includes('images')
              ? `${process.env.REACT_APP_API_URL}/${product.img1}`
              : product.img1
          }
          alt=''
          width='100'
        />
        {/* <img src={product.img1} alt='' width='100' /> */}
      </td>
      <td>{product.name}</td>
      <td>{formatCash(product.price.toString())} VND</td>
      <td>{props.quantity}</td>
    </tr>
  );
};

export default OrderDetailList;
