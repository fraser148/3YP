import React, { useEffect, useState }    from 'react';
import Header   from '../components/Header';
import Drones   from '../components/Drones';
import Map      from '../components/Map';
import PathMap      from '../components/PathMap';
import { Container, Row, Col, ProgressBar }   from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
    labels: ['Diseased', 'Unhealthy', 'Healthy', 'Pending'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 2, 3, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(61, 96, 194, 0.205)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(61, 96, 194, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

const Dashboard = () => {
    const [drones, setDrones] = useState([]);
    const [project, setProject] = useState();
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    useEffect(() => {
        const getProject = async (projectID) => {
            const proj = await axios.get("http://localhost:3001/api/project/" + projectID);
            const dron = await axios.get('http://localhost:3001/api/project/drones/' + 1);
            setDrones(dron.data.drones)
            console.log(dron.data.drones)
            setProject(proj.data.project)
            console.log(proj.data.project)
            setLoading(false);
        };
        getProject(id);
    }, [id])


    // const data = {
    //     labels: ['Diseased', 'Unhealthy', 'Healthy', 'Pending'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [project.intialDiseased, 2, 3, 7],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(61, 96, 194, 0.205)'
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(61, 96, 194, 1)'
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   };

    return (
        <div className="dashboard">
            <Header />
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
                                    {!loading &&
                                    <div className="stage">
                                        <h1>Stage 1: Initial Survey</h1>
                                        <span><ProgressBar className="stage-progress"  variant="success" animated now={34} label={`34%`} /></span>
                                        <div className="hold-graph">
                                            <Doughnut data={data} />
                                        </div>
                                    </div>
                                    }
                                    
                                    {!loading &&
                                        <div className='drone-info'>
                                            <h2>ID: {drones[selected].id}</h2>
                                            <span>Type: {drones[selected].type}</span>
                                            <h3>Task: {drones[selected].task.name}</h3>
                                            <p>{drones[selected].task.desc}</p>
                                            <h4>Progress</h4>
                                            <span>Estimate Time Remaining: <strong>4 minutes</strong></span>
                                            <span><ProgressBar className="task-progress" animated now={drones[selected].task.progress} label={`${drones[selected].task.progress}%`} /></span>
                                        </div>
                                    }
                                </div>
                                
                            </Col>
                            <Col sm={6} lg={6} xl={6} md={6}>
                                {/* <Map drones={drones} selected={selected} /> */}
                                {!loading && <PathMap 
                                
                                project={project}
                                drones={drones}
                                selected={selected}
                                />}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;