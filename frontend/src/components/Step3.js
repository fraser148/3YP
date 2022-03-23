import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../services/updateAction";
import MapInit                          from './MapInit';

const Step3 = (props) => {
  
  const [area, setArea] = useState(0)

  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction  });

  const [boundary, setBoundary] = useState(state.boundary)
  let navigate = useNavigate();
  const onSubmit = (data) => {
    data.boundary = boundary
    actions.updateAction(data);
    navigate("../result");
  };

  const center = state.center

  useEffect(() => {
    let mounted = true;
    

    return () => mounted = false;
  }, [])


  return (
    <><form onSubmit={handleSubmit(onSubmit)}>
    <h2>Step 3</h2>
    <MapInit
      boundary = {boundary}
      setBoundary = {setBoundary}
      setArea = {setArea}
      center = {center}
    />
    <button type="submit">Nice</button>
    <table className="coords-table">
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
    </table>
    <span>{area.toFixed(3)}m<sup>2</sup></span>
  </form>
    <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
    
  );
};

export default Step3;
