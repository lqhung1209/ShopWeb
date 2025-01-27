import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import classes from './ProductsList.module.css';
import ProductsListInfo from './ProductsListInfo';
import Popup from './Popup';

const ProductList = props => {
  const products = props.products;
  //hàm lấy giá trị từ store popup
  const isOpen = useSelector(state => state.popup.isOpen);

  return (
    <Fragment>
      <div className={classes.productList}>
        <p>Made The Hard Way</p>
        <p className={classes.special}>Top Trending Products</p>
        <div className={classes.productListContent}>
          {products.map(data => (
            <ProductsListInfo key={data.id} product={data} />
          ))}
        </div>
      </div>
      {isOpen && <Popup />}
    </Fragment>
  );
};

export default ProductList;
