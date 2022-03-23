import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-content-container">
            <div className="header-content">
                <div className="title">
                    <h2>VITI</h2>
                </div>
                <div className="nav">
                    <Link to="/about">ABOUT</Link>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Header