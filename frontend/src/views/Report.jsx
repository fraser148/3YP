import React, { useEffect, useState }    from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import HeatMap from '../components/HeatMap';


ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [datapoints, setDatapoints] = useState();
    let { id } = useParams();

    const colorsForMap = [
        ['unhealthy', "#FFF5DD"],
        ['diseased', "#FFE0E6"],
        ['healthy', "#DBEDDB"]
    ];
    const colors = new Map(colorsForMap);

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
                        <img src="http://localhost:3001/logo.png" alt="logo"/>
                        <h1>Project Report</h1>
                        <h3>{project.surveyName}</h3>
                        <span><i>{formatDate(project.startDate)}</i></span>
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
                <h2>Stage 1 Summary</h2>
                <p>The field has been deemed within <span className="status" style={{backgroundColor: colors.get('healthy')}}>healthy</span> range.</p>
                <div className='wrapper'>
                    <div className="col-50">
                        <div className="hold-graph">
                            <Doughnut data={data} />
                            <span className='caption'><i>Figure 1</i> - Your Field Health</span>
                        </div>
                    </div>
                    <div className='col-50'>
                        <HeatMap data={[[90,50,0.25],[90,90,0.32],[150,180,0.3],[200,150,0.5],[240,150,0.3]]}/>
                        <span className='caption'><i>Figure 2</i> - Stage 1 Survey</span>
                    </div>
                </div>

            </div>
        }

        </div>
    )
}

export default Report;