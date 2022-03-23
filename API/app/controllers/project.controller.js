import db from "../models/index.js";

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



export default {
    getSetup,
    getAvailable
}