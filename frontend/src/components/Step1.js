import React, { useEffect, useState } from "react";
import { useForm }                    from "react-hook-form";
import { useNavigate }                from "react-router-dom";
import { useStateMachine }            from "little-state-machine";
import updateAction                   from "../services/updateAction";
import { getSetup }                   from '../services/getSetup';

const Step1 = (props) => {
  const [center, setCenter] = useState([51.75423118080835,-1.2565135404143575])
  const [boundary, setBoundary] = useState([])
  const [setup, setSetup] = useState({drones: [], clients: []})

  const { actions, state } = useStateMachine({ updateAction });
  let navigate = useNavigate();
  const onSubmit = (data) => {
    data.center = center
    data.boundary = boundary
    actions.updateAction(data);
    navigate("./step2");
  };

  const { register, watch, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
        client: 1
      }
  });

  const watchClient = watch("client",2);


  useEffect(() => {
    let mounted = true;
    getSetup()
        .then(details => {
            if (mounted) {
                setSetup(details);
                console.log(details)
            }
        })
    return () => mounted = false;
  }, [])

  useEffect(() => {
    if (!setup.clients.length) {
        return <span></span>
    } else {
        console.log(watchClient)
        let cent = [setup.clients.find(x => x.id === Number(watchClient)).client_lat,setup.clients.find(x => x.id === Number(watchClient)).client_lng];
        setCenter(cent)
        const dx = 0.002;
        const dy = 0.001;
        const field = [
            { lat: Number(cent[0]) + dy, lng: Number(cent[1]) + dx },
            { lat: Number(cent[0]) - dy, lng: Number(cent[1]) + dx },
            { lat: Number(cent[0]) - dy, lng: Number(cent[1]) - dx },
            { lat: Number(cent[0]) + dy, lng: Number(cent[1]) - dx }
        ];
        setBoundary(field)
    }
},[watchClient, setup])

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <span className="label">Client</span>
        <select {...register("client", { required: true })} onSelect={(e) => console.log(e)}>
            {setup.clients.map((client, i) => (
                <option key={i} value={client.id}>{client.name}</option>
            ))}
        </select>
        {errors.client && (
            <span role="alert">
            This field is required
            </span>
        )}
        <button type="submit">Submit</button>
    </form>
    {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </>
    
    
  );
};

export default Step1;
