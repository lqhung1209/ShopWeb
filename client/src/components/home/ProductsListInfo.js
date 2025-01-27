import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../store/popup';

import classes from './ProductsList.module.css';

const ProductsListInfo = props => {
  const dispatch = useDispatch();

  const product = props.product;

  //hàm hiện popup (store)
  const showPopupHandler = () => {
    dispatch(popupActions.showPopup(product));
  };

  return (
    <Fragment>
      <div className={classes.productInfo}>
        {/* click vào ảnh hiện popup */}
        <img src={product.img1} alt='List' onClick={showPopupHandler} />
        <p className={classes.name}>{product.name}</p>
        {/* thêm dấu , vào mỗi 3 số */}
        <p className={classes.price}>
          {Number(product.price).toLocaleString()} VND
        </p>
      </div>
    </Fragment>
  );
};

export default ProductsListInfo;
