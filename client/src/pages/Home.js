import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import Others from '../components/home/Others';
import ProductList from '../components/home/ProductsList';

const Home = props => {
  return (
    <div className='container'>
      <Banner />
      <Categories />
      <ProductList products={props.products} />
      <Others />
    </div>
  );
};

export default Home;
