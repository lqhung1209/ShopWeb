import { useParams } from 'react-router-dom';
import ProductDetail from '../components/detail/ProductDetail';

const Detail = props => {
  const params = useParams();
  const productId = params.productId;

  const products = props.products;

  return (
    <div className='container'>
      {products.map(data =>
        data._id === productId ? (
          <ProductDetail products={products} product={data} />
        ) : (
          ''
        )
      )}
    </div>
  );
};

export default Detail;
