import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { Container, Row, Col }   from 'react-bootstrap';

const DroneType = () => {
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState();

    const { typeID } = useParams();

    useEffect(() => {
        const getData = async () => {
            const myType = await axios.get("http://localhost:3001/api/drone/type/" + typeID);
            setType(myType.data.type);
            console.log(myType.data.type)
            setLoading(false);
        };

        getData();
    },[typeID]);

    return (
        <div className="dashboard">
            <Header />
            {!loading &&
            <>
                <div className='project-basic'>
                    <span className='client'>{type.name}</span>
                    <span className='client'>{type.speed}</span>
                    
                </div>
                
                <div className="droneTypes">


                </div>
                </>
            }

            <div className="main-container-dash">
                <div className="main-content">
                    <Container>
                        {!loading &&
                            <Row>
                                <Col sm={6} lg={6} xl={6} md={6}>
                                    
                                    <div className="droneTypes">
                                        <h1>{type.name}</h1>
                                        <span className="type">{type.type}</span>
                                        <h3>Stats</h3>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Max Speed</td>
                                                    <td>{type.maxSpeed} kmh<sup>-1</sup></td>
                                                </tr>
                                                <tr>
                                                    <td>Flight Time</td>
                                                    <td>{type.flightTime} mins</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a target="_blank" href={"http://localhost:3001/"+type.url} rel="noreferrer">Link to Specs</a>
                                    </div>
                                </Col>
                                <Col sm={6} lg={6} xl={6} md={6}>
                                    <img src={"http://localhost:3001/" + type.image} alt={type.name}/>
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
            </div>

        </div>
    )
};

export default DroneType;