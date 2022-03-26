const Task = (sequelize, Sequelize) => sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    progress: {
        type: Sequelize.INTEGER
    },
    droneId: {
        type: Sequelize.STRING
    }
});

export default Task;