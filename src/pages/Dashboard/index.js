import './index.css'
import React, { useState, useEffect, useRef} from "react";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

function Dashboard () {

    const [showModal, setShowModal] = useState(false);
    const [menuUser, setmenuUser] = useState(false)

    const MenuUser = () => {
        setmenuUser(prevState => !prevState); 
    }

    const Home = () => {
        window.location.href = '/' 
    }

    
    return (
        <div className='container-dashboard'>
            <div className={`header ${showModal ? "container-blur" : " "}`}>
                <div className="img-inline">
                <img className="isologo-home" src="/imagens/isologo.png"/>
                </div>
                <div className="search-input">
                    <input 
                        className="search-ipt"
                        placeholder="Search"
                        />
                </div>
                    <nav className="nav-header">
                        <ul>
                        <button onClick={Home} className="btn-nav-home">Home</button>
                        <button onClick={Dashboard} className="btn-nav-dashboard">Dashboard</button>
                        <button className="btn-nav-project">Projects</button>
                        <button className="btn-nav-tasks">My tasks</button>
                        <button className="btn-nav-help 
                        ">Help</button>
                        </ul>
                    </nav>
                <div className="btn-header">
                    <button className="not"><NotificationsIcon className="icon-header" fontSize="medium"/></button>
                    <button className="set"><SettingsIcon className="icon-header" fontSize="medium"/></button>
                    <button onClick={MenuUser }className="acc"><AccountCircleIcon className="icon-header" fontSize="large"/></button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;