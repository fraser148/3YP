import React from 'react';
import Header from '../components/Header';
import { Container }   from 'react-bootstrap';

const NotFound = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="main-container-dash">
                <div className="main-content">
                    <Container>
                        <h1>404 Not Found</h1>
                    </Container>
                </div>
            </div>
        </div>
    )
};

export default NotFound;