import React  from 'react';
import Drones   from '../components/Drones';
import PathMap      from '../components/PathMap';
import { Container, Row, Col, ProgressBar }   from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Stage1 = ({drones, data, project, selected, setSelected}) => {
    return (
        <div className="main-container-dash">
            <div className="side-info">
                <Drones
                    drones={drones}
                    setSelected={setSelected}
                />
                
            </div>
            <div className="main-content">
                <Container>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <div className="salient-info">
                                <div className="stage">
                                    <h1>Stage 1: Initial Survey</h1>
                                    <span><ProgressBar className="stage-progress"  variant="success" animated now={34} label={`34%`} /></span>
                                    <div className="hold-graph">
                                        <Doughnut data={data} />
                                    </div>
                                </div>

                                <div className='drone-info'>
                                    <h2>ID: {drones[selected].id}</h2>
                                    <span>Type: {drones[selected].type}</span>
                                    <h3>Task: {drones[selected].task.name}</h3>
                                    <p>{drones[selected].task.desc}</p>
                                    <h4>Progress</h4>
                                    <span>Estimate Time Remaining: <strong>4 minutes</strong></span>
                                    <span><ProgressBar className="task-progress" animated now={drones[selected].task.progress} label={`${drones[selected].task.progress}%`} /></span>
                                </div>
                            </div>
                            
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            {/* <Map drones={drones} selected={selected} /> */}
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

export default Stage1;