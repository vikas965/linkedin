import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
//   const [headerVisible, setHeaderVisible] = useState(true);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    // setHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

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
    <footer className={`footer ${visible ? 'visible' : 'hidden'}`}>
        <div className="icons">
          <NavLink to="/"> <div className="icon"><i className="fa-solid fa-house-chimney isize"></i><br /><div className="icontent">Home</div></div></NavLink>    
          <NavLink to="/mynetwork">   <div className="icon"><i className="fa-solid fa-user-group isize"></i><br /><div className="icontent">My Network</div></div> </NavLink> 
          <NavLink to="/post"> <div className="icon"><i className="fa-solid fa-square-plus isize"></i><br /><div className="icontent">Post</div></div></NavLink> 
          <NavLink to="/notify"> <div className="icon"><i className="fa-solid fa-bell isize"></i><br /><div className="icontent">Notifications</div></div></NavLink> 
          <NavLink to="/jobs"> <div className="icon"><i className="fa-solid fa-briefcase isize"></i><br /><div className="icontent">Jobs</div></div></NavLink> 


        </div>
      </footer>
  )
}

export default Footer
