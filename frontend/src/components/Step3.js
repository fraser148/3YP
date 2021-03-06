import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../services/updateAction";
import MapInit                          from './MapInit';
import axios from 'axios';

const Step3 = (props) => {
  
  const [area, setArea] = useState(0)

  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction  });

  const [boundary, setBoundary] = useState(state.boundary)
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    // Add boundary data to state
    data.boundary = boundary;
    const coordinates = [];
    const betterBoundary = [];

    // Resizing boundary
    data.boundary.forEach(element => {
      coordinates.push([element.lng - state.center[1], element.lat - state.center[0]]);
      betterBoundary.push([element.lng, element.lat]);
    });
    coordinates.push([data.boundary[0].lng - state.center[1], data.boundary[0].lat - state.center[0]]);
    betterBoundary.push([data.boundary[0].lng, data.boundary[0].lat]);

    // Datatype change for database
    const polygon = { type: 'Polygon', coordinates: 
      [betterBoundary]
    };
    console.log(polygon)
    // Make coordinates bigger by factor of 10,000
    coordinates.forEach(element => {
      element[0] = element[0]*10000
      element[1] = element[1]*10000
    })


    // Add resized coordinates to state
    data.coordinates = coordinates

    // Update state data
    
    const sending = {
      boundary: polygon,
      active: true,
      clientId: state.client,
      area: area,
      surveyName: state.name,
      time1: state.time1,
      time2: state.time2,
      time3: state.time3,
      startDate: state.date
    }
    
    const project = await axios.post("http://localhost:3001/api/project/create", sending);
    console.log(project);
    data.projectId = project.data.projectId;
    actions.updateAction(data);

    navigate("../result");
  };

  const center = state.center


  return (
    <><form onSubmit={handleSubmit(onSubmit)}>
    <h2>Step 3</h2>
    <span>Area: {area.toFixed(1)} m<sup>2</sup></span>
    <MapInit
      boundary = {boundary}
      setBoundary = {setBoundary}
      setArea = {setArea}
      center = {center}
    />
    <button type="submit">Nice</button>
    {/* <table className="coords-table">
        <tbody>
            <tr>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        {boundary.map((boundary, i) => (
            <tr key={i}>
                <td>{boundary.lat.toFixed(5)}</td>
                <td>{boundary.lng.toFixed(5)}</td>
            </tr>
        ))}
            
        </tbody>
    </table> */}
  </form>
    {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </>
    
  );
};

export default Step3;
