import React from "react";
import Header from "../components/Header";
import { Container, Row, Col }   from 'react-bootstrap';

const Home = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="main-container home">

                <div className="main-content home">
                    <Container className="main-full">
                        <Row>
                            <Col sm={6} lg={6} xl={6} md={6}>
                                <h1>Protect your grapes!</h1>
                                
                            </Col>
                            <Col sm={6} lg={6} xl={6} md={6}>
                                <img src={"http://localhost:3001/bust2.png"} alt="science-dude" className="holder"/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Home;