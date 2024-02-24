// Mynetwork.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import demo from "./assets/demopic.png";
import ConnectionRequests from './ConnectionRequests';
import { Link } from 'react-router-dom';
const Mynetwork = () => {
  const userId = localStorage.getItem('user_id') || '1';
  const apiUrl = `http://localhost/projects/linkedin/fetchConnections.php?user_id=${userId}`;

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (response.data && response.data.connections) {
          setUserData(response.data.connections);
        } else {
          console.error('Malformed response data');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const sendConnectionRequest = async (receiverId) => {
    try {
      if (!userId) {
        throw new Error('Invalid user ID');
      }

      const response = await axios.post('http://localhost/projects/linkedin/send_connection_request.php', {
        requester_id: userId,
        receiver_id: receiverId,
      });

      const data = response.data;

      console.log(data);

      if (data.success) {
        // Update user data to reflect the new connection status
        setUserData((prevData) =>
          prevData.map((item) =>
            item.id === receiverId ? { ...item, connection_status: 'pending' } : item
          )
        );
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  console.log('Render: userData', userData);

  return (
    <div className='mynetwork'> 
      <div className="head-connections" style={{marginTop:"80px"}}>
        <Link to="/connectionsview">
          <div className="myconnections">
            <p>Manage my network</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
      </div>
      <ConnectionRequests/>
      <div className="sugg-head" style={{ marginTop: "15px", marginLeft: "15px", fontWeight: "500", fontSize: "18px" }}>More Suggestions for you </div>
      <div className="mynetwork3">
        <div className="connections">
          {userData.map((eachitem) => {
            const imagePath = eachitem.imagepath ? `http://localhost/projects/linkedin/userprofilepics/${eachitem.imagepath}` : demo;
            return (
              <div key={eachitem.id} className="connection">
                <img src={imagePath} alt="" />
                <p className="name">{eachitem.username}</p>
                {/* Check if the status is 'pending' */}
                {eachitem.connection_status === 'pending' ? (
                  <span className='cnsent'>Request Sent</span>
                ) : eachitem.connection_status === 'connected' ? (
                  <span className='cnsucc'>Connected</span>
                ) : (
                  <button className='cnbutton' onClick={() => sendConnectionRequest(eachitem.id)}>Connect</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mynetwork;
