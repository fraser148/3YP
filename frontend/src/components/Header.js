import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-content-container">
            <div className="header-content">
                <div className="title">
                    <Link to="/"><img src={"./logo.png"} alt="main logo"/></Link>
                </div>
                <div className="nav">
                    <Link to="/">old planner</Link>
                    <Link to="/plan">old planner</Link>
                    <Link to="/planner">plan</Link>
                    <Link to="/survey">survey</Link>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Header