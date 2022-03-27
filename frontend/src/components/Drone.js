import React from 'react';
import {ProgressBar }   from 'react-bootstrap';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
  }

const forget = ({drone, customClick, index}) => {
    return (
        <div className="drone-container" onClick={customClick}>
        <div className="drone">
            <img className="drone-ico" src="./drone.png" alt="mini drone"/>
            <span>ID: {drone.id}</span>
            <span>|</span>
            <span>{drone.battery}%  <Battery battery={drone.battery}/></span>
            {/* <span>{bat}%  <Battery battery={bat}/></span> */}
            <span>|</span>
            <span><ProgressBar className="task-progress" animated now={drone.task.progress} label={`${drone.task.progress}%`} /></span>
            {/* <span><ProgressBar className="task-progress" animated now={prog} label={`${prog}%`} /></span> */}
        </div>
    </div>
    )
}

const Battery = ({battery}) => {
    if (battery >= 90) {
        return <img className="battery-img" src="./full-battery.png" alt="full battery"/>
    } else if (battery < 90 && battery >= 60 ) {
        return <img className="battery-img" src="./battery.png" alt="medium battery"/>
    } else if (battery < 60 && battery >= 30) {
        return <img className="battery-img" src="./half-battery.png" alt="half battery"/>
    } else if (battery < 30 && battery >= 5) {
        return <img className="battery-img" src="./low-battery.png" alt="low battery"/>
    } else {
        return <img className="battery-img" src="./empty-battery.png" alt="empty battery"/>
    }
}

const Drone = ({drone, customClick, index}) => {
    // let prog = getRandomIntInclusive(0,100);
    // let bat = getRandomIntInclusive(0,100);
    return (
        <tr onClick={customClick}>
            <td>{drone.id}</td>
            <td>{drone.battery}% <Battery battery={drone.battery}/></td>
            <td><span><ProgressBar className="task-progress" animated now={drone.task.progress} label={`${drone.task.progress}%`} /></span></td>
        </tr>
    )
}

export default Drone;