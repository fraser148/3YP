const DroneType = (sequelize, Sequelize) => sequelize.define("drone_types", {
    type: {
        type: Sequelize.STRING(20),
        primaryKey: true
    }
});

export default DroneType;