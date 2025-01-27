import classes from './ShopNavBar.module.css';
import { useDispatch } from 'react-redux';
import { categoriesActions } from '../../store/categories';

const ShopNavBar = () => {
  const dispatch = useDispatch();

  //các hàm chọn sản phẩm theo danh mục
  const toggleAllHandler = () => {
    dispatch(categoriesActions.toggleCategories(''));
  };

  const toggleiPhoneHandler = () => {
    dispatch(categoriesActions.toggleCategories('iphone'));
  };

  const toggleiPadHandler = () => {
    dispatch(categoriesActions.toggleCategories('ipad'));
  };

  const toggleMacbookHandler = () => {
    dispatch(categoriesActions.toggleCategories('macbook'));
  };

  const toggleAirpodHandler = () => {
    dispatch(categoriesActions.toggleCategories('airpod'));
  };

  const toggleWatchHandler = () => {
    dispatch(categoriesActions.toggleCategories('watch'));
  };

  const toggleMouseHandler = () => {
    dispatch(categoriesActions.toggleCategories('mouse'));
  };

  const toggleKeyboardHandler = () => {
    dispatch(categoriesActions.toggleCategories('keyboard'));
  };

  const toggleOtherHandler = () => {
    dispatch(categoriesActions.toggleCategories('other'));
  };

  return (
    <div className={classes.shopNavbar}>
      <h2>Categories</h2>
      <div className={classes.category}>
        <h3 className={classes.bgblack}>Apple</h3>
        {/* click vào từng danh mục sẽ hiển thị sản phẩm tương ứng */}
        <a href onClick={toggleAllHandler}>
          All
        </a>
      </div>
      <div className={classes.category}>
        <h3>Iphone & Mac</h3>
        <a href onClick={toggleiPhoneHandler}>
          iPhone
        </a>
        <a href onClick={toggleiPadHandler}>
          iPad
        </a>
        <a href onClick={toggleMacbookHandler}>
          Macbook
        </a>
      </div>
      <div className={classes.category}>
        <h3>Wireless</h3>
        <a href onClick={toggleAirpodHandler}>
          Airpod
        </a>
        <a href onClick={toggleWatchHandler}>
          Watch
        </a>
      </div>
      <div className={classes.category}>
        <h3>Other</h3>
        <a href onClick={toggleMouseHandler}>
          Mouse
        </a>
        <a href onClick={toggleKeyboardHandler}>
          Keyboard
        </a>
        <a href onClick={toggleOtherHandler}>
          Other
        </a>
      </div>
    </div>
  );
};

export default ShopNavBar;
