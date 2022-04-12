import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Dashboard from './Dashboard';
import Topography from '../components/Topography';
import Plan from './Plan'
import Survey from './Survey';
import Projects from './Projects';
import Home from './Home';
import NotFound from './NotFound';
import Report from './Report';
import DroneType from './DroneType';
import QR from './QR';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Projects />}/>
        <Route path="/dashboard/project/:id" element={<Dashboard />}/>
        <Route path="/report/project/:id" element={<Report />}/>
        <Route path="/topography" element={<Topography />}/>
        <Route path="/plan/*" element={<Plan/>}/>
        <Route path="/survey" element={<Survey />}/>
        <Route path="/drone/type/:typeID" element={<DroneType />}/>
        <Route path="/allocate" element={<QR />}/>
      </Routes>
    </div>
  );
}

export default App;
