import axios from 'axios';
import React  from 'react';
import { Container, Row, Col }   from 'react-bootstrap';
import PathMap      from '../components/PathMap';

const Stage0 = ({drones, data, project, selected, setSelected}) => {

    const initiateProject = async () => {
        await axios.post("http://localhost:3001/api/project/start/" + project.id);
    }

    return (
        <div className="main-container-dash">
            <div className="main-content">
                <Container>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <div className="salient-info">
                                <div className="stage">
                                    <h1>Start Project</h1>
                                    <h3>Survey Stats:</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Path Distance</td>
                                                <td>{(project.pathDistance/1000).toFixed(2)}km</td>
                                            </tr>
                                            <tr>
                                                <td>Area to Cover</td>
                                                <td>{(project.area).toFixed(2)}m<sup>2</sup></td>
                                            </tr>
                                            <tr>
                                                <td>Recommended Drones</td>
                                                <td>{project.survey1Drones} Survey Drones</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button onClick={() => initiateProject()}>Begin Project and Allocate Drones</button>
                                </div>
                            </div>
                            
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <PathMap 
                                project={project}
                                drones={drones}
                                selected={selected}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Stage0;