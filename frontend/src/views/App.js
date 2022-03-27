import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Dashboard from './Dashboard';
import Topography from '../components/Topography';
import ProjectPlan from './ProjectPlan';
import Plan from './Plan'
import Survey from './Survey';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/topography" element={<Topography />}/>
        <Route path="/plan" element={<ProjectPlan />}/>
        <Route path="/planner/*" element={<Plan />}/>
        <Route path="/survey" element={<Survey />}/>
      </Routes>
    </div>
  );
}

export default App;
