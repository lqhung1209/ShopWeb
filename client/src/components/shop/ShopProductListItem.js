import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './ShopProductListItem.module.css';

const ShopProductListItem = props => {
  const navigate = useNavigate();
  const product = props.product;

  return (
    <Fragment>
      <div className={classes.productInfo}>
        {/* click vào ảnh chuyển sang trang chi tiết sản phẩm */}
        <img
          src={product.img1}
          alt='List'
          onClick={() => navigate(`/detail/${product._id}`, { replace: true })}
        />
        <p className={classes.name}>{product.name}</p>
        <p className={classes.price}>
          {Number(product.price).toLocaleString()} VND
        </p>
      </div>
    </Fragment>
  );
};

export default ShopProductListItem;
