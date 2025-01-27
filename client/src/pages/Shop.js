import ShopNavBar from '../components/shop/ShopNavBar';
import ShopProductList from '../components/shop/ShopProductList';

const Shop = props => {
  return (
    <div className='shop container'>
      <ShopNavBar />
      <ShopProductList products={props.products} />
    </div>
  );
};

export default Shop;
