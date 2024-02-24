import React, { useEffect, useState } from 'react';
import testimg from './assets/demopic.png';

const ConnectionRequests = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost/projects/linkedin/fetchConnectionRequests.php?receiver_id=${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setConnectionRequests(data);
      } catch (error) {
        console.error('Error fetching connection requests:', error);
      }
    };

    fetchConnectionRequests();
  }, []);

  const handleAccept = async (requesterId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }
  
      const response = await fetch('http://localhost/projects/linkedin/acceptConnectionRequest.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester_id: requesterId,
          receiver_id: userId,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`);
      }
  
      // Update the local state to mark the connection request as 'connected'
      setConnectionRequests((prevRequests) =>
      prevRequests.filter((request) => request.requester_id !== requesterId)
    );
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };
  

  const handleReject = async (requesterId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const response = await fetch(`http://localhost/projects/linkedin/rejectConnectionRequest.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester_id: requesterId,
          receiver_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the rejected request from the local state
      setConnectionRequests(connectionRequests.filter(request => request.requester_id !== requesterId));
    } catch (error) {
      console.error('Error rejecting connection request:', error);
    }
  };

  return (
    <div className='requests-container'>
      <div className="req-header"> <p>Invitations ({connectionRequests.length})</p> <i className="fa-solid fa-arrow-right"></i> </div>

      {connectionRequests.map((request) => (
        <div key={request.requester_id} className="request">
          <div className="reqsec">
            <div className="req-image">
              <img
                src={request.imagepath ? `http://localhost/projects/linkedin/userprofilepics/${request.imagepath}` : testimg}
                alt=""
              />
            </div>
            <div className="req-profile">
              <p className="name">{request.username}</p>
              <p className="role">{request.userrole}</p>
            </div>
          </div>
          <div className="accept-reject">
            <div className="reject" onClick={() => handleReject(request.requester_id)}>
              <i className="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="accept" onClick={() => handleAccept(request.requester_id)}>
              <i style={{ color: "blue" }} className="fa-regular fa-circle-check"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectionRequests;
