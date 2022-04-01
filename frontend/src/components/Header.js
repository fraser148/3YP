import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-content-container">
            <div className="header-content">
                <div className="title">
                    <Link to="/"><img src={"http://localhost:3001/logo.png"} alt="main logo"/></Link>
                </div>
                <div className="nav">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/survey">survey</Link>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Header