import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import img from "./assets/loginlogo.png"
import { Link } from 'react-router-dom';
import UserProfileImage from './UserProfileImage';
import UserName from "./UserName"
const Sidebar = ({ isOpen, closeSidebar }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginStatus = () => {
            try {
                // Check if the user_id is set in local storage
                const user_id = localStorage.getItem('user_id');
                const isLoggedIn = !!user_id;

                // console.log('User ID:', user_id);
                setLoggedIn(isLoggedIn);

                // You can call navigate here inside the useEffect
                if (!isLoggedIn) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching login status:', error);
            }
        };

        fetchLoginStatus(); // Fetch login status when the Sidebar component mounts
    }, [navigate]); // Include navigate in the dependencies array

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isOpen && !e.target.closest('.sidebar')) {
                closeSidebar();
            }
        };

        document.body.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.body.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, closeSidebar]);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {loggedIn ? (
                <div className='sidecon'>
                    <div className="sec1">
                    <Link to="/profile"><UserProfileImage/></Link>
                   
                   <p><UserName/> <span><img id='lnlogo' src={img } alt="" /></span></p>
                   <Link to="/profile"><h6>View profile</h6></Link>
                   
                    </div>
                    <hr />
                    <div className="sec2">
                        <p className="views"><span className='sec2p'> 34</span> profile viewers</p>
                        <p className="imps"> <span className='sec2p'> 44</span> post impressions</p>
                    </div>

                    <hr />
                    <hr id='btline'/>
                    <div className="sec3">
                        
                        <div className="settings"><i style={{color:"grey",paddingLeft:"4px"}} className="fa-solid fa-gear"></i> Settings</div>
                        <br />
                        <div className="logout"><Logout /></div>
                    </div>
                    
                </div>
                
            ) : null}
        </div>
    );
};

export default Sidebar;
