import React from "react";
import { Route, Routes } from 'react-router-dom';
import { StateMachineProvider, createStore } from "little-state-machine";
import { Container, Row, Col }          from 'react-bootstrap';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Result from "./Result"
import Header from "./Header";

createStore({});

function Plan() {
  return (
    <StateMachineProvider>
      <div className="dashboard">
        <Header />
        <div className="main-container">
          <Container>
            <Row>
              <Col sm={12} lg={12} md={12}>
                <h1>Plan Project</h1>
                <Routes>
                  <Route exact path="/" element={<Step1/>} />
                  <Route exact path="/step2" element={<Step2 />} />
                  <Route exact path="/step3" element={<Step3 />} />
                  <Route exact path="/result" element={<Result />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      

    </StateMachineProvider>
  );
}

export default Plan