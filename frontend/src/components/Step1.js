import React, { useEffect, useState } from "react";
import { useForm }                    from "react-hook-form";
import { useNavigate, useParams }                from "react-router-dom";
import { StateMachineProvider, useStateMachine }            from "little-state-machine";
import updateAction                   from "../services/updateAction";
import { getSetup }                   from '../services/getSetup';
import { Row, Col }   from 'react-bootstrap';
import axios from "axios";

const getMin = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
  dd = '0' + dd;
  }

  if (mm < 10) {
  mm = '0' + mm;
  } 
      
  // today = dd + '/' + mm + '/' + yyyy;
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

const Step1 = (props) => {
  const [client, setClient] = useState()
  const [loading, setLoading] = useState(true);

  const { clientID } = useParams();
  const { actions } = useStateMachine({ updateAction });
  let navigate = useNavigate();

  const onSubmit = (data) => {
    const cent = [client.client_lat,client.client_lng];
    data.center = cent;
    data.client = client.id;
    const dx = 0.002;
    const dy = 0.001;
    const field = [
      { lat: Number(cent[0]) + dy, lng: Number(cent[1]) + dx },
      { lat: Number(cent[0]) - dy, lng: Number(cent[1]) + dx },
      { lat: Number(cent[0]) - dy, lng: Number(cent[1]) - dx },
      { lat: Number(cent[0]) + dy, lng: Number(cent[1]) - dx }
    ];
    data.boundary = field
    actions.updateAction(data);
    navigate("./../../step3");
  };

  const { register, formState: { errors }, handleSubmit } = useForm();


  useEffect(() => {
    const getClient = async () => {
      const clie = await axios.get("http://localhost:3001/api/client/" + clientID);
      console.log(clie.data.client)
      setClient(clie.data.client);
      setLoading(false);
    } 
    getClient()
  }, [clientID])

//   useEffect(() => {
//     if (!setup.clients.length) {
//         return <span></span>
//     } else {
//         console.log(watchClient)
//         let cent = [setup.clients.find(x => x.id === Number(watchClient)).client_lat,setup.clients.find(x => x.id === Number(watchClient)).client_lng];
//         setCenter(cent)
//         const dx = 0.002;
//         const dy = 0.001;
//         const field = [
//             { lat: Number(cent[0]) + dy, lng: Number(cent[1]) + dx },
//             { lat: Number(cent[0]) - dy, lng: Number(cent[1]) + dx },
//             { lat: Number(cent[0]) - dy, lng: Number(cent[1]) - dx },
//             { lat: Number(cent[0]) + dy, lng: Number(cent[1]) - dx }
//         ];
//         setBoundary(field)
//     }
// },[watchClient, setup])

  return (
    <>
    <Row>
      <Col sm={12} lg={6} md={6}>
        <div className="setup-form">
          <h2>Step 1</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Project Name</label>
            <input  {...register("name", {required: true, maxLength: 50 })} type="text"/>
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            <label>Start Date</label>
            <input  {...register("date", {required: true})} type="date" min={getMin()}/>
            {errors.date && errors.date.type === "required" && <span>This is required</span>}
            <label>Survey 1 Time limit (mins)</label>
            <input  {...register("time1", {required: true})} type="number" min={1} />
            {errors.time1 && errors.time1.type === "required" && <span>This is required</span>}
            <label>Survey 2 Time limit (mins)</label>
            <input  {...register("time2", {required: true})} type="number" min={1} />
            {errors.time2 && errors.time2.type === "required" && <span>This is required</span>}
            <label>Spraying Time limit (mins)</label>
            <input  {...register("time3", {required: true})} type="number" min={1} />
            {errors.time3 && errors.time3.type === "required" && <span>This is required</span>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </Col>
      <Col md={6} lg={6} sm={12}>

        {!loading &&

        <div className="client-details">
          <div className="deets">
            <h3>Details</h3>
            <p>Name: {client.name}</p>
            <p>Email: <a href={"mailto:"+client.email}>{client.email}</a></p>
          </div>
          <div className="deets">
            <h3>Address</h3>
            <p>{client.address1}</p>  
            <p>{client.address2}</p>  
            <p>{client.postcode}</p> 
          </div>
        </div>
        }
      </Col>
    </Row>
    
    
    {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </>
    
    
  );
};

export default Step1;
