import React, { useEffect, useState }    from 'react';
import Header   from '../components/Header';
import Drones   from '../components/Drones';
import Map      from '../components/Map';
import { getDrones } from '../services/getDrones';
import { Container, Row, Col }   from 'react-bootstrap';

const Dashboard = () => {
    const [drones, setDrones] = useState([])

    useEffect(() => {
        let mounted = true;
        getDrones(1)
            .then(drones=> {
                if(mounted) {
                    setDrones(drones.drones)
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <div className="dashboard">
            <Header />
            <div className="main-container">
                <Container>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <Drones drones={drones} />
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <Map drones={drones} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Dashboard;