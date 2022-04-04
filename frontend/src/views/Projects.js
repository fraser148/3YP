import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Container, Row, Col  }   from 'react-bootstrap';
import axios from 'axios';
import ProjectList from "../components/ProjectList";

const Projects = () => {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState();
    const [client, setClient] = useState();
    const [projects, setProjects] = useState();

    useEffect(() => {
        const getClients = async () => {
            const clie = await axios.get("https://viti-332822.nw.r.appspot.com/api/clients");
            setClients(clie.data.clients)
            console.log(clie.data.clients);
            setLoading(false);
        };
        getClients();
    }, []);

    const getProjects = (event) => {
        event.preventDefault()
        console.log(client)
    }

    const changeClient = async (e) => {
        console.log(e.target.value);
        const c = e.target.value
        setClient(c);
        const myClients = await axios.get("https://viti-332822.nw.r.appspot.com/api/client/projects/" + c);
        console.log(myClients.data);
        setProjects(myClients.data.projects);
    }



    return (
        <div className="dashboard">
        <Header />
        <div className="main-container">

            <div className="main-content select-project">
                <Container>
                    <Row>
                        <Col sm={12} lg={12} xl={12} md={12}>
                            <div className="projects">

                                    <h1>Choose a Client</h1>
                                    {!loading &&
                                        <div className="client-list">
                                            <form onSubmit={getProjects}>
                                            <select value={client} onChange={(e) => changeClient(e)}>
                                                <option>-- Select a Client --</option>
                                                {clients.map(client => (
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </select>
                                            </form>
                                        </div>
                                    }
                                    {projects &&
                                        <ProjectList
                                            projects={projects}
                                            client={client}
                                        />   
                                    }                                

                            </div>
                            
                        </Col>
                        <Col sm={6} lg={6} xl={6} md={6}>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </div>
    )
}

export default Projects;