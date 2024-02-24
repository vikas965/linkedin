import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        // Remove user ID from local storage
        localStorage.removeItem('user_id');

        // Redirect or perform any other action after successful logout
        console.log('Logout successful');
        // You can use react-router navigation here
        window.location.href = '/login';
    };

    return (
        <div>

            <button style={{color:"black",fontSize:"16px",fontFamily:"Arial, Helvetica, sans-serif"}} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
