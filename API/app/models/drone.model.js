const Drone = (sequelize, Sequelize) => sequelize.define("drones", {
    id: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    battery: {
        type: Sequelize.INTEGER
    }
    // ,
    // type: {
    //     type: Sequelize.STRING(20)
    // }
});

export default Drone;