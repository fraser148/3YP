import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { getAvailable }      from '../services/getDrones';
import updateAction from "../services/updateAction";

const Step2 = (props) => {
  const { register, handleSubmit } = useForm();
  const [max_drones, setMax_drones] = useState(0)
  const { actions, state } = useStateMachine({ updateAction  });
  let navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    navigate("../step3");
  };

  useEffect(() => {
    let mounted = true;
    getAvailable()
        .then(details => {
            if (mounted) {
                setMax_drones(details.drones)
            }
        });
    return () => mounted = false;
  }, [])


  return (
    <><form onSubmit={handleSubmit(onSubmit)}>
    <h2>Step 2</h2>
    <table>
      <tbody>
          {/* <tr>
              <td><span className="form_number">Large Survey Drones ({max_drones})</span></td>
              <td><input {...register("drones_survey_large")} type="number" max={max_drones} min={0} /></td>
          </tr>
          <tr>
              <td><span className="form_number">Small Survey Drones ({max_drones})</span></td>
              <td><input {...register("drones_survey_small")} type="number" max={max_drones} min={0} /></td>
          </tr>
          <tr>
              <td><span className="form_number">Sprayer Drones ({max_drones})</span></td>
              <td><input {...register("drones_sprayer")} type="number" max={max_drones} min={0} /></td>
          </tr> */}
          <tr>
              <td><span className="form_number">Time Limit (hours)</span></td>
              <td><input  {...register("time", {required: true})} type="number" min={1} /></td>
          </tr>
          <tr>
            <td>
              <button type="submit">Submit</button>
            </td>
          </tr>
      </tbody>
  </table>
  </form>
    {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </>
    
  );
};

export default Step2;
