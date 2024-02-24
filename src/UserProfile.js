import React, { useState, useEffect,useRef } from 'react';
import UserProfileImage from './UserProfileImage';
import { Link } from 'react-router-dom';
const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const userId = localStorage.getItem('user_id') || '1'; // Replace with the actual user_id you want to fetch
  const apiUrl = `http://localhost/projects/linkedin/fetchUserdata.php?user_id=${userId}`;

  const [userData, setUserData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    setImage(file);
  };

  const handleUpload = () => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);

    fetch('http://localhost/projects/linkedin/uploadUserProfile.php', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          const text = await response.text();
          throw new Error(text);
        }
      })
      .then((data) => {
        console.log(data);
        // Handle the response from the server

        // Clear the image and its preview after successful upload
        setImage(null);
        setImagePreview(null);
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      });
  };

  const handleRemoveProfile = () => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
        console.error('User ID not found in local storage');
        return;
    }

    fetch(`http://localhost/projects/linkedin/removeUserProfile.php`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response from the server
        })
        .catch(error => {
            console.error('Error removing profile', error);
        });
};

  const handleIconClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };
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

  return (
    <div className='Userprofilecomponent'>

      <div className="profile-header">

      </div>
      <div className="profile-section-pro">
      <UserProfileImage />
      <i style={{fontSize:"20px"}} className="fa-solid fa-plus" onClick={handleIconClick}></i>
    <div className="details">
    {userData ? (
      <>
          <h2 style={{fontSize:"25px"}}> {userData.username}</h2>
          <h2 style={{fontSize:"20px",color:"grey"}}> {userData.userrole}</h2>
          </>
      ) : (
        <p>Loading user details...</p>
      )}
      <hr />
    </div>
      </div>
      
      <div className="userprofiledetails">     
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {imagePreview && (
        <div className='preview'>
          <img className='previewimg' src={imagePreview} alt="Preview"  />
          <h3>Preview</h3>
          <button className='uploadimg' onClick={handleUpload}>Upload Profile</button>
        </div>
      )}
      
     
      <button style={{display:"none"}} onClick={handleRemoveProfile}>Remove Profile</button>
      

      <div className="sect-prof" style={{display:"flex",width:"100%", alignItems:"center",justifyContent:"space-around"}}>
        <Link style={{textDecoration:"none",color:"black",padding:"10px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"7px"}} to="/connectionsview" >Manage Network  <i  className="fa-solid fa-users"></i></Link>
        <Link  style={{textDecoration:"none",color:"black",padding:"10px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"7px"}}  to="/message">Message  <i  className="fa-solid fa-message"></i></Link>
      </div>

        

      </div>
      
      
    </div>
  );
};

export default UserProfile;
