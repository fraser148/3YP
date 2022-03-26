import db from "../models/index.js";

const Location = db.location;
const Project = db.project;
const Drone = db.drone;
const Task = db.task;

const sendLocation = (req, res) => {
    Location.findOne({
        where: {
            droneId : req.params.id
        }
    }).then(location => {
        if(!location) {
            return res.status(404).send("Drone location not found")
        }

        res.status(200).send({
            id: location.droneId,
            lat: location.lat,
            lng: location.lng
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const sendDrones = (req, res) => {
    Drone.findAll({
        where: {
            allocation: req.params.project
        },
        include: [{
            model: Location
        },
        {
            model: Task,
            where: {
                isActive: true
            }
        }]
    })
    .then(drone => {
        if (!drone) {
            res.status(404).send("Drones not found!")
        }
        res.status(200).send({
            drones: drone
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

const getProject = (req, res) => {
    Project.findOne({
        where: {
            id: req.params.project
        }
    })
    .then(project => {
        if(!project) {
            res.status(404).send("Project not found")
        }
        res.status(200).send({
            project: project
        })
        
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export default {
    sendLocation,
    sendDrones,
    getProject
}