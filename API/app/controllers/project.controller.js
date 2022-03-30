import db from "../models/index.js";
import child_process from "child_process";
const spawn = child_process.spawn

const Location = db.location;
const Project = db.project;
const Drone = db.drone;
const Client = db.client;

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
        Project.create({
            boundary: req.body.boundary,
            active: true,
            clientId: req.body.clientId,
            area: req.body.area
        });
        res.status(200).send({message: "That worked"});
    } catch(err) {
        res.status(500).send("Error creating project.")
    }
}

function run(ox, oy) {
    return new Promise((resolve, reject) => {
        const process= spawn('python', ["C:/Users/fjren/GitProjects/GUI/path_planning/PathPlanner.py", ox, oy]);
  
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

const getRoute = async (req, res) => {
    try {
        const ox = String(req.body.xs);
        const oy = String(req.body.ys);
        // const ox = '[9.999999999976694, -12.922379128710304,-20.62692383645981,3.8898199391468324,9.999999999976694]';
        // const oy = '[20.000000000000018, 21.072883605977033,-16.3521957397883,-27.72476196293283,20.000000000000018]';
        const output = await run(ox,oy);
        let outter = output[0].split('\r\n');
        const coords = [];
        outter.forEach(element => {
            if (element.length > 50) {
                coords.push(element);
            } 
        });
        let str = coords[0];
        let px = str.substring(
            str.indexOf("[") + 1,
            str.lastIndexOf("]")
        );
        let py = coords[1];
        px = px.match(/-?\d+(?:\.\d+)?/g).map(Number);
        py = py.match(/-?\d+(?:\.\d+)?/g).map(Number);
        const points = [];
        for (let i = 0; i < px.length; i++) {
            points.push({x : px[i], y: py[i]});
        }
        res.status(200).send({points});
      } catch (e) {
        console.error('Error during script execution ', e.stack);
        res.status(500).send({e});
      }
}


export default {
    getSetup,
    getAvailable,
    createProject,
    getRoute
}