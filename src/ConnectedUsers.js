import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ConnectedUsers = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost/projects/linkedin/fetchConnectedUsers.php?user_id=${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setConnections(data.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);
console.log(connections);
  return (
    <div className='connected-users'>
      <div className="header-view-users">
                <div><Link to="/connectionsview"><i style={{ color: "grey" }} class="fa-solid fa-arrow-left"></i></Link></div>
                <p style={{fontSize:"19px"}}>Connections</p>
      </div>
      <div className="connected-users-list">
      {connections.map(connection => ( 
        <div className="notification" key={connection.id}>

          
        <div className="notimage"><img src={`http://localhost/projects/linkedin/userprofilepics/${connection.imagepath}`} alt="" /></div>
       <div className="name"><div className="naming">{connection.username}</div><div className="role">{connection.userrole}</div></div>
           
        <div className="time">
        <i className="fa-solid fa-ellipsis-vertical"></i>
        <i className="fa-solid fa-paper-plane"></i>
        </div>

      </div>
    
         
        ))}
        </div>
      
    </div>
  );
};

export default ConnectedUsers;
