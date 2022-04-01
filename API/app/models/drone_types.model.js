const DroneType = (sequelize, Sequelize) => sequelize.define("drone_types", {
    type: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20)
    },
    url:{
        type: Sequelize.STRING
    },
    maxSpeed: {
        type: Sequelize.FLOAT
    },
    flightTime: {
        type: Sequelize.FLOAT
    }
});

export default DroneType;