import config from "../config/db.config.js";
import Location from "../models/location.model.js";
import DroneType from "../models/drone_types.model.js";
import Drone from "../models/drone.model.js";
import Project from "../models/project.model.js";
import Client from "../models/client.model.js";
import Task from "../models/task.model.js";
import Sequelize from "Sequelize";

// Connect to database
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Datatypes
db.location = Location(sequelize, Sequelize);
db.drone = Drone(sequelize, Sequelize);
db.droneType = DroneType(sequelize, Sequelize);
db.project = Project(sequelize, Sequelize);
db.client = Client(sequelize, Sequelize);
db.task = Task(sequelize, Sequelize);

// Relationships
db.droneType.hasMany(db.drone, { foreignKey: "type" });
db.drone.hasOne(db.location);
db.client.hasMany(db.project);
db.project.hasMany(db.drone, { foreignKey: "allocation"});
db.drone.hasOne(db.task);

export default db;