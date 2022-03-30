import React, { useEffect, useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../services/updateAction";
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

const data_points = [
		{
			"x": 124.52733028133163,
			"y": 58.16483037637725
		},
		{
			"x": 122.57495616096372,
			"y": 58.598691292014564
		},
		{
			"x": 120.62258204059582,
			"y": 59.03255220765188
		},
		{
			"x": 118.67020792022791,
			"y": 59.46641312328919
		},
		{
			"x": 116.71783379986,
			"y": 59.900274038926504
		},
		{
			"x": 114.7654596794921,
			"y": 60.334134954563815
		},
		{
			"x": 112.8130855591242,
			"y": 60.767995870201126
		},
		{
			"x": 110.8607114387563,
			"y": 61.201856785838444
		},
		{
			"x": 108.90833731838839,
			"y": 61.635717701475755
		},
		{
			"x": 106.95596319802048,
			"y": 62.069578617113066
		},
		{
			"x": 105.00358907765258,
			"y": 62.50343953275038
		},
		{
			"x": 103.05121495728467,
			"y": 62.93730044838769
		},
		{
			"x": 101.09884083691676,
			"y": 63.371161364025006
		},
		{
			"x": 99.14646671654886,
			"y": 63.80502227966232
		},
		{
			"x": 97.19409259618095,
			"y": 64.23888319529964
		},
		{
			"x": 95.24171847581306,
			"y": 64.67274411093695
		},
		{
			"x": 93.28934435544514,
			"y": 65.10660502657426
		},
		{
			"x": 91.33697023507725,
			"y": 65.54046594221157
		},
		{
			"x": 89.38459611470932,
			"y": 65.97432685784888
		},
		{
			"x": 87.43222199434143,
			"y": 66.40818777348619
		},
		{
			"x": 85.47984787397351,
			"y": 66.8420486891235
		},
		{
			"x": 83.52747375360562,
			"y": 67.27590960476081
		},
		{
			"x": 81.57509963323771,
			"y": 67.70977052039812
		}
]

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
        borderColor: 'black',
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
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'black',
        borderWidth: 1,
        pointBackgroundColor: ['#222'],
        pointBorderColor: ['#222'],
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
      let body = {xs, ys};
      console.log(body)
      let response = await axios.post("http://localhost:3001/api/project2/route", body)
      setDatapoints(response.data.points);
      console.log(response);
      setLoading(false);
    };

    fetchData();
  },[])

  return (
    <>
      {!loading &&
        <Scatter options={options} data={data} />
      }
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
    
  );
};

export default Result;
