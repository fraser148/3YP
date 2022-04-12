import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Container, Row, Col }          from 'react-bootstrap';
import Header from "../components/Header";
import { set } from 'react-hook-form';



const QR = () => {
    const [data, setData] = useState('No result');
    const [ids, setIds] = useState(["Drones"]);

    let no_drones = 3;

    const validateDrone = (drone) => {
        // Code must be of form: "Drone ID: ABC123"
        // Length must be 16

        if (no_drones - ids.length + 1 <= 0) {
            setData("All drones allocated")
            return
        }

        if (drone.length !== 16) {
            setData("Invalid Code length")
            return
        }

        const type = drone.substring(10,13);
        const num = drone.substring(13,16);
        let id;

        if (/^[A-Z]+$/.test(type)) {
            if (/^[0-9]+$/.test(num)) {
                id = type + num;
                if (!ids.includes(id)) {
                    setData(id + " " + type + " " + num)
                    let temp = ids;
                    temp.push(id);
                    setIds(temp)
                    return
                }
                setData("Already Registered: " + id)
                return
            }
        }

        setData("Invalid ID formation. Must be 'Drone ID ABC123'")

    }

    return (

        <div className="dashboard">
            <Header />
            <div className="main-container">
            <Container>
                <h1>Allocate Drones</h1>
                <Row>
                    <Col md={6}>
                    <div className="QR-container">
                        <h3>Scan QR code on drone</h3>
                        <QrReader
                            className='qr-reader'
                            onResult={(result, error) => {
                            if (!!result) {
                                validateDrone(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                            }}
                            style={{ width: '100%' }}
                        />

                        </div>
                    </Col>
                    <Col md={6}>
                        <h2>Drones remaining: {no_drones - ids.length + 1}</h2>
                        <p>{data}</p>
                        <div className='drone-list-allocate'>
                            {ids.map((id) => (
                                <span>{id}</span>
                            ))}
                        </div>
                    </Col>
                </Row>

            </Container>
            </div>
        </div>
  );
}

export default QR