import React, { useEffect, useState } from 'react';
// import './App.css'; // Import your CSS file
import { Link } from 'react-router-dom';

// import Navimage from './UserProfileImage';
const Navbar = ({ toggleSidebar }) => {

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

 
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [headerVisible, setHeaderVisible] = useState(true);
  // const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    // setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
       // eslint-disable-next-line
    }, [prevScrollPos]);


    

 
  return (
    <header className={`header ${headerVisible ? 'visible' : 'hidden'}`}>
        <div className="head-container">
          <div className="image">
          
            <img onClick={toggleSidebar} src={Navimage() || "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"} alt="" />
          </div>
          <div className="search">
          <i id='search-icon' style={{ color: "grey", fontSize: "14px" }} className="fa-solid fa-search isize"></i>
            <input id="header-search" type="search" name="search" placeholder='Search'  /></div>
          <div className="comment">
       <Link to="/message"> <i style={{ color: "grey", fontSize: "19px" }} className="fa-solid fa-comment-dots isize"></i></Link>     
          </div>
        </div>
        
      </header>

     
  );
}

export default Navbar



