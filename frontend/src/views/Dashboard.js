import React, { useEffect, useState }    from 'react';
import Header   from '../components/Header'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Stage1 from '../components/Stage1';
import Stage0 from '../components/Stage0';

const Dashboard = () => {
    const [drones, setDrones] = useState([]);
    const [project, setProject] = useState();
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(true);
    const [datapoints, setDatapoints] = useState();
    let { id } = useParams();

    useEffect(() => {
        const getProject = async (projectID) => {
            const proj = await axios.get("http://localhost:3001/api/project/" + projectID);
            const dron = await axios.get('http://localhost:3001/api/project/drones/' + projectID);
            setDrones(dron.data.drones)
            setProject(proj.data.project)
            console.log(proj.data.project)
            const my = proj.data.project;
            const pending = 100 - (my.initialDiseased + my.initialUnhealthy + my.initialHealthy)
            setDatapoints([my.initialDiseased,my.initialUnhealthy,my.initialHealthy,pending])
            setLoading(false);
        };
        getProject(id);
    }, [id]);

    const data = {
        labels: ['Diseased', 'Unhealthy', 'Healthy', 'Pending'],
        datasets: [
            {
                label: 'NDVI Rating',
                data: datapoints,
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

    return (
        <div className="dashboard">
            <Header />
            {!loading &&
                <div className='project-basic'>
                    <span className='client'>{project.client.name}</span>
                    <span className='client'>{project.surveyName}</span>
                    <span className='client'>{project.client.name}</span>
                </div>
            }

        {!loading && (() => {
                switch (project.stage) {
                case 'Stage 0':
                    return (
                        <Stage0
                            drones={drones}
                            data={data}
                            project={project}
                            selected={selected}
                            setSelected={setSelected}
                        />)
                case 'Stage 1':
                    return (
                        <Stage1 
                            drones={drones}
                            data={data}
                            project={project}
                            selected={selected}
                            setSelected={setSelected}
                        />)
                default:
                    return null
                }
            })()}

        </div>
    )
}

export default Dashboard;