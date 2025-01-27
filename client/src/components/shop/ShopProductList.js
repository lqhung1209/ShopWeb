import classes from './ShopProductList.module.css';
import ShopProductListItem from './ShopProductListItem';
import { useSelector } from 'react-redux';

const ShopProductList = props => {
  const products = props.products;
  //biến lấy categories từ store
  const categories = useSelector(state => state.categories.data);

  return (
    <div className={classes.shopProduct}>
      <div className={classes.productForm}>
        <input placeholder='Enter Search Here!' />
        <select>
          <option>Default Sorting</option>
        </select>
      </div>
      <div className={classes.productList}>
        {/* nếu categories = rỗng nghĩa là All */}
        {categories === ''
          ? products.map(data => (
              <ShopProductListItem key={data._id} product={data} />
            ))
          : products.map(data =>
              data.category === categories ? (
                <ShopProductListItem key={data._id} product={data} />
              ) : (
                ''
              )
            )}
      </div>
    </div>
  );
};

export default ShopProductList;
