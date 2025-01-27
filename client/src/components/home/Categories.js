import classes from './Categories.module.css';

import image1 from '../../images/product_1.png';
import image2 from '../../images/product_2.png';
import image3 from '../../images/product_3.png';
import image4 from '../../images/product_4.png';
import image5 from '../../images/product_5.png';

import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.categories}>
      <p>Carefully Created Collections</p>
      <p className={classes.special}>Browse Our Categories</p>
      {/* click vào chuyển sang trang Shop */}
      <div
        className={classes.categoryProduct}
        onClick={() => navigate('/shop', { replace: false })}
      >
        <div className={classes.row1}>
          <img src={image1} alt='Product 1' />
          <img src={image2} alt='Product 2' />
        </div>
        <div className={classes.row2}>
          <img src={image3} alt='Product 3' />
          <img src={image4} alt='Product 4' />
          <img src={image5} alt='Product 5' />
        </div>
      </div>
    </div>
  );
};

export default Categories;
