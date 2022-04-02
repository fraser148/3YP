import React, { useEffect, useState }    from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
    const [project, setProject] = useState();
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(true);
    const [datapoints, setDatapoints] = useState();
    let { id } = useParams();

    useEffect(() => {
        const getProject = async (projectID) => {
            const proj = await axios.get("http://localhost:3001/api/project/" + projectID);
            setProject(proj.data.project)
            console.log(proj.data.project)
            const my = proj.data.project;
            const pending = 100 - (my.initialDiseased + my.initialUnhealthy + my.initialHealthy)
            setDatapoints([my.initialDiseased,my.initialUnhealthy,my.initialHealthy,pending])
            setLoading(false);
        };
        getProject(id);
    }, [id]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            'en-gb',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'utc'
            }
        ); 
    }

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
        <div className="report">
            {!loading &&
                <div className='report-header'>
                    <div className="company-info">
                        <h1>Viticulture</h1>
                        <h2>{project.surveyName}</h2>
                    </div>
                    <div className='client-info'>
                        <h3>Customer Details</h3>
                        <span className='client'>{project.client.name}</span>
                        <span className='client'>{project.client.address1}</span>
                        <span className='client'>{project.client.address2}</span>
                        <span className='client'>{project.client.country}</span>
                        <span className='client'>{project.client.postcode}</span>
 
                    </div>
                </div>
            }

        {!loading && 
        
            <div className='stage1'>
                <h3>Stage 1 Summary</h3>
                <div className="hold-graph">
                    <Doughnut data={data} />
                    <span><i>Figure 1</i> - Your Field Health</span>
                </div>
            </div>
        }

        </div>
    )
}

export default Report;