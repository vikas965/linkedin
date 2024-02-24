import React from 'react'
import { Link } from 'react-router-dom'
const ConnectedUsersView = () => {
    return (
        <div className='conn-users-view'>
            <div className="header-view-users">
                <div><Link to="/mynetwork"><i style={{ color: "grey" }} class="fa-solid fa-arrow-left"></i></Link></div>
                <p>Manage my network</p>
            </div>
            <div className="connusers-view">
               <Link to="/connections">
               <div className="eachview">
                    <div className="viewsec1">
                        <i class="fa-solid fa-user-group"></i>
                        <p>Connections</p>
                    </div>
                    <div className="viewsec2">
                        <p>318</p>
                    </div>
                </div></Link>
                
                <hr />
                <div className="eachview">
                    <div className="viewsec1">
                        <i class="fa-solid fa-user-check"></i>
                        <p>People i follow</p>
                    </div>
                    <div className="viewsec2">
                        <p>2</p>
                    </div>
                </div>
                <hr />
                <div className="eachview">
                    <div className="viewsec1">
                        <i class="fa-solid fa-users"></i>
                        <p>Groups</p>
                    </div>
                    <div className="viewsec2">
                        <p>1</p>
                    </div>
                </div>
                <hr />
                <div className="eachview">
                    <div className="viewsec1">
                        <i class="fa-solid fa-building"></i>
                        <p>Pages</p>
                    </div>
                    <div className="viewsec2">
                        <p>12</p>
                    </div>
                </div>
                <hr />
                <div className="eachview">
                    <div className="viewsec1">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>Events</p>
                    </div>
                    <div className="viewsec2">
                        <p>2</p>
                    </div>
                </div>
                <hr />

            </div>
        </div>
    )
}

export default ConnectedUsersView
