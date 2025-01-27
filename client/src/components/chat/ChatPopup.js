import { Fragment, useState, useEffect } from 'react';

import ChatFeed from './ChatFeed';
import classes from './ChatPopup.module.css';

import useHttp from '../../hooks/use-https';

import openSocket from 'socket.io-client';

const ChatPopup = () => {
  const { sendRequest: requestHandler, error } = useHttp();

  const [isClicking, setIsClicking] = useState(false);

  let roomId = localStorage.getItem('roomId');
  const [chatMessage, setChatMessage] = useState([]);
  const [messageBadge, setMessageBadge] = useState(0);

  const reloadRoomId = () => {
    roomId = localStorage.getItem('roomId');
    const getChatRoom = data => {
      // nếu status là false thì đoạn chat chưa end
      if (!data.status) {
        setChatMessage(data.message);
        setMessageBadge(data.badge);
      }
      //nếu chat đã end nhưng vẫn có storage
      else {
        localStorage.removeItem('roomId');
      }
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/chat/${roomId}`,
      },
      getChatRoom
    );
  };

  useEffect(() => {
    // nếu có storageId chat thì sẽ get data
    if (roomId) {
      const getChatRoom = data => {
        // nếu status là false thì đoạn chat chưa end
        if (!data.status) {
          setChatMessage(data.message);
          setMessageBadge(data.badge);
        }
        //nếu chat đã end nhưng vẫn có storage
        else {
          localStorage.removeItem('roomId');
        }
      };
      requestHandler(
        {
          url: `${process.env.REACT_APP_API_URL}/chat/${roomId}`,
        },
        getChatRoom
      );
      const socket = openSocket(`${process.env.REACT_APP_API_URL}`);
      socket.on('chat', data => {
        if (data.action === 'post') {
          requestHandler(
            {
              url: `${process.env.REACT_APP_API_URL}/chat/${roomId}`,
            },
            getChatRoom
          );
        }
      });
    }
  }, [requestHandler, roomId]);

  //hàm chuyển đổi state để ẩn/hiện Chat feed
  const showChatFeedHandler = e => {
    e.preventDefault();
    isClicking ? setIsClicking(false) : setIsClicking(true);
    if (roomId) {
      const postMakeAsRead = data => {};
      requestHandler(
        {
          url: `${process.env.REACT_APP_API_URL}/make-message`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: {
            roomId,
            isAdmin: false,
          },
        },
        postMakeAsRead
      );
    }
  };

  return (
    <Fragment>
      {error}
      <button className={classes.chatPopup} onClick={showChatFeedHandler}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          viewBox='0 0 512 512'
        >
          <path d='M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z' />
        </svg>
      </button>
      {messageBadge !== 0 && (
        <span className={classes.badge}>{messageBadge}</span>
      )}
      {isClicking && (
        <ChatFeed
          data={chatMessage}
          roomId={roomId}
          reloadRoomId={reloadRoomId}
        />
      )}
    </Fragment>
  );
};

export default ChatPopup;
