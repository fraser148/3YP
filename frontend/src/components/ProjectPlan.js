import React, { useEffect, useState }   from 'react';
import Header                           from './Header';
import MapInit                          from './MapInit';
import { useForm  }                     from 'react-hook-form';
import { getDrones, getAvailable }      from '../services/getDrones';
import { getSetup }                     from '../services/getSetup';
import { Container, Row, Col }          from 'react-bootstrap';

const ProjectPlan = () => {
    const [drones, setDrones] = useState([])
    const [boundary, setBoundary] = useState([])
    const [area, setArea] = useState(0)
    const [setup, setSetup] = useState({drones: [], clients: []})
    const [center, setCenter] = useState([51.75423118080835,-1.2565135404143575])
    const [max_drones, setMax_drones] = useState(0)

    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            client: 1
          }
    });

    const watchClient = watch("client",2); // you can supply default value as second argument
    // const watchClient = 1;
    const onSubmit = data => console.log(data);

    
    useEffect(() => {
        let mounted = true;
        getDrones(1)
            .then(drones=> {
                if(mounted) {
                    setDrones(drones.drones)
                }
                // const field = [
                //     { lat: 51.75423118080835, lng: -1.2565135404143575 },
                //     { lat: 51.75440726625279, lng: -1.2553188436305536 },
                //     { lat: 51.75410114803945, lng: -1.255275081843601 },
                //     { lat: 51.754022586391606, lng: -1.25562955230903 },
                //     { lat: 51.75354850459475, lng: -1.2554457528127159 },
                //     { lat: 51.753418469860236, lng: -1.2561765746548232 }
                // ];
                // setBoundary(field);
            })
        getSetup()
            .then(details => {
                if (mounted) {
                    setSetup(details);
                    console.log(details)
                }
            })
        getAvailable()
            .then(details => {
                if (mounted) {
                    setMax_drones(details.drones)
                }
            });
        return () => mounted = false;
      }, [])

    useEffect(() => {
        if (!setup.clients.length) {
            return <span></span>
        } else if (watchClient === undefined) {
            console.log(setup)
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
        <div className="dashboard">
            <Header />
            <div className="main-container">
                <Container>
                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <h1>Plan Project</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                {center}
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><span className="form_number">Large Survey Drones ({max_drones})</span></td>
                                            <td><input {...register("drones_survey")} type="number" max={max_drones} min={0} /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="form_number">Small Survey Drones ({max_drones})</span></td>
                                            <td><input {...register("drones_survey")} type="number" max={max_drones} min={0} /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="form_number">Sprayer Drones ({max_drones})</span></td>
                                            <td><input {...register("drones_survey")} type="number" max={max_drones} min={0} /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="form_number">Time Limit (hours)</span></td>
                                            <td><input  {...register("time")} type="number" min={1} /></td>
                                        </tr>
                                    </tbody>
                                </table>

                                
                                
                                
                                {/* Each drone can do 45 mins on a full charge */}

                                <input type="submit" />
                            </form>
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
                            
                            
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>
                            <MapInit
                                drones={drones}
                                boundary = {boundary}
                                setBoundary = {setBoundary}
                                setArea = {setArea}
                                center = {center}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ProjectPlan;