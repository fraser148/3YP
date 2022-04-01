import db from "../models/index.js";
import child_process from "child_process";
import { connect } from "http2";
import { Console } from "console";
const spawn = child_process.spawn

const Location = db.location;
const Project = db.project;
const Drone = db.drone;
const Client = db.client;
const Type = db.droneType;

const getSetup = async (req, res) => {
    try {
        const clients = await Client.findAll()
        const drones = await Drone.findAll()
        if (!clients || !drones) {
            res.status(404).send("Drones not found!")
        }
        // res.status(404).send("Drones not found!")
        res.status(200).send({ drones: drones, clients: clients })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

const getAvailable = async (req, res) => {
    try {
        const drones = await Drone.count({
            where: {
                allocation: null
            }
        });
        console.log(drones)
        res.status(200).send({drones});
    } catch(err) {
        res.status(500).send("Ayo something has gone wrong with the count")
    }
}

const createProject = async (req, res) => {
    try {
        console.log(req.body.boundary.coordinates)
        const { boundary, clientId, area, surveyName, time1, time2, time3, startDate} = req.body;
        const project = await Project.create({
            boundary,
            active: true,
            clientId,
            area,
            surveyName,
            survey1TimeLimit: time1,
            survey2TimeLimit: time2,
            sprayTimeLimit: time3,
            startDate
        });
        const projectId = project.id;
        res.status(200).send({message: "That worked", projectId});
    } catch(err) {
        res.status(500).send("Error creating project.")
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).send({clients});
    } catch(err) {
        res.status(500).send({message: "Error fetching clients"});
    }
}

const getClientProjects = async (req, res) => {
    try {
        const client = parseInt(req.params.client);
        console.log(client)
        const projects = await Project.findAll({where: {clientId:client}});
        res.status(200).send({projects});
    } catch(err) {
        res.status(500).send({message: "Error fetching projects"})
    }
};

const getClient = async (req, res) => {
    try {
        const c = req.params.client;
        const client = await Client.findOne({where: { id: c }});
        res.status(200).send({client})
    } catch(err) {
        res.status(500).send({message: err})
    }
};

const calcDrones = async (time, distance) => {
    console.log(time);
    const drones = await Type.findOne({where: {
        type: "Large Surveyor"
    }});
    const {maxSpeed, flightTime } = drones.dataValues;
    const pathTakes = distance / maxSpeed * 60 * 60 / 1000 // seconds
    const maxTime = time * 60;
    let NoDrones = pathTakes * pathTakes / flightTime / maxTime;
    NoDrones = Math.ceil(NoDrones);
    console.log(NoDrones);
    return NoDrones
};

function run(ox, oy) {
    return new Promise((resolve, reject) => {
        const process = spawn('python', ["C:/Users/fjren/GitProjects/GUI/path_planning/PathPlanner.py", ox, oy]);
  
        const out = []
        process.stdout.on(
            'data',
            (data) => {
            out.push(data.toString());
            // console.log(out)
            }
        );
    
    
        const err = []
        process.stderr.on(
            'data',
            (data) => {
            err.push(data.toString());
            }
        );
    
        process.on('exit', (code, signal) => {
            console.log(`${code} (${signal})`)
            if (code !== 0) {
            //   reject(new Error(err.join('\n')))
                process.exit(0)
                // resolve(out)
            }
            try {
                resolve(out)
                return
            } catch(e) {
                reject(e);
                process.exit(1);
            }
        });
    });
}

const calcUnit = (center) => {
    // 1/10000 where 10,000 was the scale factor used in the resizing in the react app.
    console.log(center)
    let lat1 = center[0];
    let lat2 = center[0] - 1/10000;
    let lon1 = center[1];
    let lon2 = center[1];

    const R = 6371e3; // metres
    let φ1 = lat1 * Math.PI/180; // φ, λ in radians
    let φ2 = lat2 * Math.PI/180;
    let Δφ = (lat2-lat1) * Math.PI/180;
    let Δλ = (lon2-lon1) * Math.PI/180;

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d1 = R * c; // in metres


    lat1 = center[0];
    lat2 = center[0];
    lon1 = center[1];
    lon2 = center[1] - 1/10000;

    φ1 = lat1 * Math.PI/180; // φ, λ in radians
    φ2 = lat2 * Math.PI/180;
    Δφ = (lat2-lat1) * Math.PI/180;
    Δλ = (lon2-lon1) * Math.PI/180;

    a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d2 = R * c; // in metres
    return [d1, d2];
}

const getRoute = async (req, res) => {
    try {
        const center = req.body.center;
        const unit = calcUnit(center);
        const ox = String(req.body.xs);
        const oy = String(req.body.ys);
        const output = await run(ox,oy);
        let py, px;
        if (output.length < 2) {
            let outter = output[0].split('\r\n');
            const coords = [];
            outter.forEach(element => {
                if (element.length > 50) {
                    coords.push(element);
                } 
            });
            let str = coords[0];
            px = str.substring(
                str.indexOf("[") + 1,
                str.lastIndexOf("]")
            );
            py = coords[1];
        } else {
            let str = output[0];
            px = str.substring(
                str.indexOf("[") + 1,
                str.lastIndexOf("]")
            );
            py = output[1];
        }
        px = px.match(/-?\d+(?:\.\d+)?/g).map(Number);
        py = py.match(/-?\d+(?:\.\d+)?/g).map(Number);
        const points = [];
        const distances = [];
        const coords = [];
        let dx, dy, distance;
        points.push({x : px[0], y: py[0]});
        coords.push([px[0]/10000+parseFloat(center[1]),  py[0]/10000+parseFloat(center[0])]);
        console.log(coords)
        for (let i = 1; i < px.length; i++) {
            dx = Math.abs((px[i] - px[i-1]))*unit[1];
            dy = Math.abs((py[i] - py[i-1]))*unit[0];
            distance = Math.sqrt(dx**2 + dy**2);
            distances.push(distance);
            points.push({x : px[i], y: py[i]});
            coords.push([px[i]/10000+parseFloat(center[1]),  py[i]/10000+parseFloat(center[0])]);
        }
        const pathDistance = distances.reduce((partialSum, a) => partialSum + a, 0);
        const surveyPath = {type: 'LineString', coordinates: coords};
        console.log(surveyPath);
        const projectId = req.body.projectId;
        const project = await Project.findOne({where: {id: projectId}});
        const time1 = project.dataValues.survey1TimeLimit;
        const survey1Drones = await calcDrones(time1, pathDistance);
        await project.set({surveyPath, pathDistance, survey1Drones});
        project.save();
        res.status(200).send({points, pathDistance});
    } catch (e) {
        console.error('Error during script execution ', e.stack);
        res.status(500).send({e});
    }
}

const startProject = async (req, res) => {
    try {
        const { project } = req.params;
        const p = await Project.findOne({where: {id: project}});
        await p.set({
            status: "In Progress",
            stage: "Stage 1"
        });
        p.save();

        await Drone.update({allocation: project},{
            where: {
                allocation: null
            },
            limit: p.dataValues.survey1Drones,
            order: [['battery', 'DESC']],
        });
        
        res.status(200).send({message: "Okay"})
    } catch (err) {

    }
}

export default {
    getSetup,
    getAvailable,
    createProject,
    getRoute,
    getClients,
    getClientProjects,
    getClient,
    startProject
}