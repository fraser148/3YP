import bodyParser     from "body-parser";
import express        from 'express';
import cors           from 'cors';
import http           from 'http'
import dotenv         from 'dotenv';
import { Server }     from 'socket.io';
import db             from './app/models/index.js';
import DroneRoutes    from './app/routes/drone.routes.js';
import ProjectRoutes  from './app/routes/project.routes.js';
import websockets     from './websockets/index.js';

const app           = express()
const port = 3001

const server = http.createServer(app)
const io = new Server(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "http://localhost:3000"
    }
  }
})

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

export {io};

dotenv.config()

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.static('app/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Location = db.location;
const Drone = db.drone;
const DroneType = db.droneType;
const Client = db.client;
const Project = db.project;
const Task = db.task;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial()
})
// db.sequelize.sync()

function initial() {
  DroneType.bulkCreate([
    {type: "Small Sprayer"},
    {type: "Large Surveyor",
    name: "P4 Multispectral",
    url: "./A700000008264657.pdf",
    image: "p4-multispectral.png",
    maxSpeed: 50,
    flightTime: 27}
  ])
  .then(() => {
    Client.bulkCreate([{
      name: "Jon Farms",
      address1: "Exeter College",
      address2: "Turl Street",
      country: "United Kingdom",
      postcode: "OX1 4HG",
      email: "fraser.rennie@exeter.ox.ac.uk",
      client_lat: 51.75377600289503,
      client_lng: -1.2560615958119348
    },{
      name: "Ipek Vineyards",
      address1: "Jesus College",
      address2: "Turl Street",
      country: "United Kingdom",
      postcode: "OX1 4HG",
      email: "ipek@exeter.ox.ac.uk",
      client_lat: 51.75312857353553,
      client_lng: -1.2509756228250952
    },
  ])
  })
  .then(() => {
    const polygon = { type: 'Polygon', coordinates: [
      [ [100.0, 0.0], [102.0, 0.0], [101.0, 1.0],
        [100.0, 1.0], [100.0, 0.0] ]
      ]};
  
    Project.create({
      boundary: polygon,
      active: true,
      clientId: 1
    })
  })
  .then(() => {
    Drone.create(
      {
        id: "D080",
        battery: 89,
        type: "Large Surveyor",
    })
    Drone.create(
      {
        id: "SUR079",
        battery: 43,
        type: "Large Surveyor",
    }).then(() => {
      Location.bulkCreate([{
        lat: 51.75362988741313,
        lng: -1.2554607810413971,
        droneId: "SUR079"
      },{
        lat: 51.75432645683681,
        lng: -1.2556660471340908,
        droneId: "D080"
      }])
      .catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  })
  .then(() => {
    Task.create({
      droneId: "SUR079",
      name: "Initial Survey",
      desc: "Drone 2 of 4 completing the survey",
      isActive: true,
      progress: 56,
    })
  })
  .then(()=> {
    Task.create({
      droneId: "D080",
      name: "Spraying some shiz",
      desc: "Spraying crops that are showing signs of mildew",
      isActive: true,
      progress: 78,
    })
  })
  
  .catch(err => {
    console.log(err)
  })
}

DroneRoutes(app);
ProjectRoutes(app);

const server2 = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

websockets(server2);