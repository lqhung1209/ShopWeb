import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { popupActions } from '../../store/popup';

import classes from './Popup.module.css';

const Popup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupData = useSelector(state => state.popup.data);

  //hàm ẩn popup
  const hidePopupHandler = () => {
    dispatch(popupActions.hidePopup());
  };

  return (
    <div className={classes.popupOverlay}>
      <div className={classes.popup}>
        {/* click vào ẩn popup */}
        <span className={classes.popupClose} onClick={hidePopupHandler}>
          &#10005;
        </span>
        <div className={classes.popupContainer}>
          <img src={popupData.img1} alt='Popup' />
          <div className={classes.popupContent}>
            <p className={classes.name}>{popupData.name}</p>
            <p className={classes.price}>{popupData.price}</p>
            <p className={classes.desc}>{popupData.long_desc}</p>
            <button
              className='btn'
              onClick={() => {
                hidePopupHandler();
                navigate(`/detail/${popupData._id}`, { replace: true });
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 512'
                className={classes.icon}
              >
                <path d='M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64H48c8.8 0 16 7.2 16 16V368c0 44.2 35.8 80 80 80h18.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H450.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H144c-8.8 0-16-7.2-16-16V80C128 35.8 92.2 0 48 0H32zM192 80V272c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H464V176c0 5.9-3.2 11.3-8.5 14.1s-11.5 2.5-16.4-.8L400 163.2l-39.1 26.1c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V32H240c-26.5 0-48 21.5-48 48z' />
              </svg>
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
