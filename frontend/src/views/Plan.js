import React from "react";
import { Route, Routes } from 'react-router-dom';
import { StateMachineProvider, createStore } from "little-state-machine";
import { Container, Row, Col }          from 'react-bootstrap';
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Result from "../components/Result"
import Header from "../components/Header";

createStore({});

function Plan() {
  return (
    <StateMachineProvider>
      <div className="dashboard">
        <Header />
        <div className="main-container">
          <Container>
            <h1>Plan Project</h1>
            <Routes>
              <Route path="/step1/:clientID" element={<Step1/>} />
              <Route path="/step2" element={<Step2 />} />
              <Route path="/step3" element={<Step3 />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </Container>
        </div>
      </div>

      

    </StateMachineProvider>
  );
}

export default Plan