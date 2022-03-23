import React  from 'react';
import Drone from './Drone'


const Drones = ({drones}) => {
    return (
        <div className="drones">
            {drones.map((drone) => (
                <Drone drone={drone} />
            ))}
            
        </div>
    )
}

export default Drones;