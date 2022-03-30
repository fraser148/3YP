const Project = (sequelize, Sequelize) => sequelize.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    boundary: {
        type: Sequelize.GEOMETRY('POLYGON')
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    area: {
        type: Sequelize.FLOAT
    }
});

export default Project;