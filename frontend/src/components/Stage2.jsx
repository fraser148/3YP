import React  from 'react';
import Drones   from '../components/Drones';
import PathMap      from '../components/PathMap';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ProgressBar }   from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Stage1 = ({drones, data, project, selected, setSelected}) => {
    return (
        <div className="main-container-dash">
            <div className="side-info">
                <div className='drone-list'>
                    <Drones
                        drones={drones}
                        setSelected={setSelected}
                    />
                </div>
                <div className='drone-info'>
                    <div className='meta'>
                        <span className='id'>ID: {drones[selected].id}</span>
                        <span className='type'>Type: <Link to={"../../drone/type/"+drones[selected].type}>{drones[selected].type}</Link></span>
                    </div>
                    <hr/>
                    <span className='drone-header'><b>Task: </b>{drones[selected].task.name}</span>
                    <span className='drone-desc'>{drones[selected].task.desc}.</span>
                    <hr/>
                    <span className='drone-header'><b>Progress</b></span>
                    <span className='drone-desc'>Estimated Time Remaining: <strong>4 minutes</strong></span>
                    <span><ProgressBar className="task-progress" animated now={drones[selected].task.progress} label={`${drones[selected].task.progress}%`} /></span>
                </div>
                
            </div>
            <div className="main-content">
                <Container>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <div className="salient-info">
                                <div className="stage">
                                    <h2>Stage 1</h2>
                                    <span className='stage-desc'>Initial Survey</span>
                                    <span className='stage-header'>Stage Progress:</span>
                                    <span><ProgressBar className="stage-progress"  variant="success" animated now={34} label={`34%`} /></span>
                                    <span className='stage-header'>Health Data:</span>
                                    <div className="hold-graph">
                                        <Doughnut data={data} />
                                    </div>
                                </div>
                            </div>
                            
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            {/* <Map drones={drones} selected={selected} /> */}
                            <div className='map-holder'>
                                <PathMap 
                                    project={project}
                                    drones={drones}
                                    selected={selected}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Stage1;