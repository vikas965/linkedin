import React, { useState, useEffect } from 'react';

const Navimage = () => {
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
          setImagePath(`http://localhost/projects/linkedin/userprofilepics/${data.imagePath}`);
        } else {
          console.error('Error fetching image path:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching image path:', error);
      });
  }, []);

  return imagePath; // Return the image URL directly
};

export default Navimage;
