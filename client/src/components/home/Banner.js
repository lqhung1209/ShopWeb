import { useNavigate } from 'react-router-dom';

import classes from './Banner.module.css';

import logo from '../../images/banner1.jpg';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.banner}>
      <img src={logo} alt='banner' />
      <div className={classes.bannerAction}>
        <p>New Inspiration 2020</p>
        <p className={classes.special}>20% Off On New Season</p>
        {/* click vào chuyển sang trang Shop */}
        <button
          className='btn'
          onClick={() => navigate('/shop', { replace: true })}
        >
          Browse collections
        </button>
      </div>
    </div>
  );
};

export default Banner;
