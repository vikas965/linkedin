import React, { useState, useEffect } from 'react';

const UserProfileImage = () => {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    fetch(`http://localhost/projects/linkedin/getUserProfileImage.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setImagePath(data.imagePath);
        } else {
          console.error('Error fetching image path:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching image path:', error);
      });
  }, []);

  return (
    <>
      {imagePath ? <img className='sideprofile'  src={`http://localhost/projects/linkedin/userprofilepics/${imagePath}`} alt="User Profile" />:<img className='sideprofile'  src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="User Profile" />}
      </>
  );
};

export default UserProfileImage;
