import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Dashboard from './Dashboard';
import Topography from '../components/Topography';
import ProjectPlan from './ProjectPlan';
import Plan from './Plan'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/topography" element={<Topography />}/>
        <Route path="/plan" element={<ProjectPlan />}/>
        <Route path="/planner/*" element={<Plan />}/>
      </Routes>
    </div>
  );
}

export default App;
