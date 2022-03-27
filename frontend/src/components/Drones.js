import React  from 'react';
import Drone from './Drone'

const Drones = ({drones, setSelected}) => {
    return (
        <div className="drones">
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Battery</th>
                        <th>Progress</th>
                    </tr>
                    {drones.map((drone, index) => (
                        <Drone drone={drone} customClick={() => setSelected(index)} />
                    ))}
                </tbody>
            </table>
            
            
        </div>
    )
}

export default Drones;