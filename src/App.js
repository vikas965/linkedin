import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import "./linkedin.css";
import Navbar from './Navbar';
import Footer from './Footer';
import Posts from "./Posts";
import Mynetwork from './Mynetwork';
import Notifications from './Notifications';
import Jobs from './Jobs';
import { Routes, Route ,useLocation } from 'react-router-dom';
import Addpost from './Addpost';
import MessageSection from './MessageSection';
import Sidebar from './Sidebar'
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import UserDetails from './UserDetails';
import ConnectedUsers from './ConnectedUsers';
import ConnectedUsersView from './ConnectedUsersView';
import MessageBlock from './MessageBlock';
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        // Simulate a 5-second delay before transitioning to the main component
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Clear the timer to prevent memory leaks if the component unmounts before the timer finishes
        return () => clearTimeout(loadingTimer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    // const hideNavbarFooterPages = ['/post', '/message','/register','/login','/profile','/connections','/connectionsview','/msgcn/:userId']; // Add paths for components where Navbar and Footer should be hidden
    // const isHiddenPage = hideNavbarFooterPages.includes(location.pathname);
    const hideNavbarFooterPages = ['/post', '/message', '/register', '/login', '/profile', '/connections', '/connectionsview', '/msgcn'];

const isHiddenPage = hideNavbarFooterPages.some(path => location.pathname.startsWith(path));

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        // console.log("open");
      };
    
      const closeSidebar = () => {
        setIsSidebarOpen(false);
        // console.log("close");
      };
    return (
        <div className='app-container'>
        
            {!isHiddenPage && <Navbar toggleSidebar={toggleSidebar} />}
            {!isHiddenPage && <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/linkedin" element={<Posts />} />               
                <Route path='/mynetwork' element={<Mynetwork />} />
                <Route path='/post' element={<Addpost />}/>
                <Route path='/notify' element={<Notifications />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/message' element={<MessageSection />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/details' element={<UserDetails />} />
                <Route path='/connections' element={<ConnectedUsers />} />
                <Route path='/connectionsview' element={<ConnectedUsersView />} />
                <Route path='/msgcn/:userId' element={<MessageBlock />} />
                             
                <Route path="*"  element={<Posts/>}/>
            </Routes>
            {!isHiddenPage && <Footer />}
        </div>
    );
}

export default App;
