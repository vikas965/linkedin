import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MessageBlock = () => {
  const { userId } = useParams();
  const senderId = localStorage.getItem('user_id');
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/projects/linkedin/fetchUserInfo.php?user_id=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [userId]);

  const fetchAllMessages = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/projects/linkedin/fetchMessages.php?sender_id=${senderId}&receiver_id=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [userId, senderId]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/projects/linkedin/fetchMessages.php?sender_id=${senderId}&receiver_id=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Directly set the messages from the server
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [userId, senderId]);

  useEffect(() => {
    // Fetch user information and all messages on component mount
    fetchUserInfo();
    fetchAllMessages();

    // Fetch messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchUserInfo, fetchAllMessages, fetchMessages]);

  const handleMessageSend = async () => {
    try {
      const response = await fetch('http://localhost/projects/linkedin/sendMessage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id: senderId,
          receiver_id: userId,
          message_text: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setNewMessage('');

      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chatareacompo'>
      {userInfo && (
        <div className="msgareaheader">
          <div><Link to="/message"><i style={{ color: "black", fontSize: "20px" }} className="fa-solid fa-arrow-left"></i></Link></div>
          <img style={{ width: "50px", height: "50px" }} src={`http://localhost/projects/linkedin/userprofilepics/${userInfo.imagepath}`} alt={userInfo.username} />
          <h2>{userInfo.username}</h2>
        </div>
      )}
      <hr />
      <div className="message-block" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">{message.msgtext}</div>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input placeholder='Message' type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <i onClick={handleMessageSend}  className="fa-solid fa-paper-plane"></i>
        
      </div>
    </div>
  );
};

export default MessageBlock;


