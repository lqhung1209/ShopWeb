import React, { useState, useRef, useEffect } from 'react';

import classes from './ChatFeed.module.css';

import useHttp from '../../hooks/use-https';

const ChatFeed = props => {
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const [message, setMessage] = useState('');
  const messageHandler = e => setMessage(e.target.value);

  //vừa vào page chuyển về cuối tin nhắn
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [props]);

  const submitHandler = e => {
    e.preventDefault();
    const postMessage = data => {
      // nếu là lần đầu gửi sẽ tạo room chat mới
      if (data.roomId) {
        localStorage.setItem('roomId', data.roomId);
        props.reloadRoomId();
      }
      // nếu chat /end
      if (data.endChat) {
        localStorage.removeItem('roomId');
      }
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/add-message`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          roomId: props.roomId,
          message,
        },
      },
      postMessage
    );
    setMessage('');
  };

  return (
    <div className={classes.chatFeed}>
      {/* header khung chat */}
      <div className={classes.chatFeedLabel}>
        <h4>Customer Support</h4>
        <button>Let's Chat App</button>
      </div>
      {/* nội dung khung chat */}
      <div className={classes.chatFeedContent}>
        {props.roomId
          ? props.data.length > 0
            ? props.data.map(e => (
                <React.Fragment>
                  {!e.isAdmin ? (
                    <p className={classes.userText}>{e.content}</p>
                  ) : (
                    <p className={classes.adminText}>
                      <img
                        src='https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg'
                        alt='Admin'
                      />
                      <span>ADMIN: {e.content}</span>
                    </p>
                  )}
                  <div ref={messagesEndRef} />
                </React.Fragment>
              ))
            : ''
          : ''}
        {error && <p className={classes.errorText}>Something went wrong</p>}
        {/* {props.error && (
          <p className={classes.errorText}>Something went wrong</p>
        )} */}
      </div>
      {/* gửi message */}
      <form className={classes.chatFeedActions} onSubmit={submitHandler}>
        <img
          src='https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg'
          alt='Admin'
        />
        <input
          type='text'
          placeholder={
            props.data.length > 0
              ? '"/end" if you want end chat'
              : 'Type your messenge!'
          }
          onChange={messageHandler}
          value={message}
          required
        />
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path d='M396.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z' />
        </svg>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM208.4 208c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm128 32c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z' />
        </svg>
        <button type='submit' disabled={loading ? true : false}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className={loading ? '' : classes.send}
          >
            <path d='M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z' />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatFeed;
