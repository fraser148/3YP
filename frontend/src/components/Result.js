import React, { useEffect, useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../services/updateAction";
import { Link } from 'react-router-dom';
import { Container, Row, Col }          from 'react-bootstrap';
import axios from 'axios';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement,LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Result = () => {
  const [datapoints, setDatapoints] = useState();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const { state } = useStateMachine({ updateAction });

  const border = [];
  state.coordinates.forEach(element => {
    border.push({x: element[0], y: element[1]})
  })

  const data = {
    datasets: [
      {
        label: "Points from planner",
        data: datapoints,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: '#d300d6',
        borderWidth: 1,
        pointBackgroundColor: ['#d300d6'],
        pointBorderColor: ['#d300d6'],
        pointRadius: 2,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true
      },
      {
        label: "Border",
        data: border,
        backgroundColor: 'rgb(99, 167, 255)',
        borderColor: 'rgb(99, 167, 255)',
        borderWidth: 1,
        pointBackgroundColor: ['rgb(99, 167, 255)'],
        pointBorderColor: ['rgb(99, 167, 255)'],
        pointRadius: 2,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true
      }
    ]
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const xs = [];
      const ys = [];
      let badBorder = state.coordinates;
      badBorder.forEach(element => {
        xs.push(element[0]);
        ys.push(element[1]);
      });
      let body = {xs, ys, center: state.center, projectId: state.projectId, time1: state.time1, time2: state.time2, time3: state.time3};
      console.log(body)
      let response = await axios.post("http://localhost:3001/api/project2/route", body)
      setDatapoints(response.data.points);
      setProject(response.data.projectId);
      console.log(response);
      setLoading(false);
    };

    fetchData();
  },[])

  return (
    <>
    <Container>
      <Row>
        <Col md={6}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Col>
        <Col md={6}>{!loading &&
          <Scatter options={options} data={data} />
      }
          <Link to={"./../../dashboard/project/" + state.projectId}>VIEW IN Dashboard</Link>
        </Col>
      </Row>
    </Container>
      
    </>
    
  );
};

export default Result;
