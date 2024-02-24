import React, { useEffect, useState } from 'react';

const UserDetails = () => {
  // Assuming you have stored user_id in localStorage with the key 'user_id'
  const userId = localStorage.getItem('user_id') || '1'; // Replace with the actual user_id you want to fetch
  const apiUrl = `http://localhost/projects/linkedin/fetchUserdata.php?user_id=${userId}`;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!userData) {
    return <>Loading user details...</>;
  }
  return (
    
     
        <>
      
       
         {userData.username}
          
        </>
      ) 
 
};

export default UserDetails;
