import classes from './Others.module.css';

const Others = () => {
  return (
    <div className={classes.others}>
      <div className={classes.othersRow1}>
        <div>
          <p className={classes.special}>Free Shipping</p>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <p className={classes.special}>24 x 7 Service</p>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <p className={classes.special}>Festival Offer</p>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={classes.othersRow2}>
        <div>
          <p className={classes.special}>Let's Be Friends!</p>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <div className={classes.subcribe}>
          <input placeholder='Enter your email address' />
          <button className='btn'>Subcribe</button>
        </div>
      </div>
    </div>
  );
};

export default Others;
