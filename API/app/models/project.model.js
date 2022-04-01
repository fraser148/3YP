const Project = (sequelize, Sequelize) => sequelize.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    surveyName: {
        type: Sequelize.STRING
    },
    survey1TimeLimit:{
        type: Sequelize.INTEGER
    },
    survey2TimeLimit:{
        type: Sequelize.INTEGER
    },
    sprayTimeLimit:{
        type: Sequelize.INTEGER
    },
    survey1Drones: {
        type: Sequelize.INTEGER
    },
    boundary: {
        type: Sequelize.GEOMETRY('POLYGON')
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    area: {
        type: Sequelize.FLOAT
    },
    surveyPath: {
        type: Sequelize.GEOMETRY('LINESTRING')
    },
    pathDistance: {
        type: Sequelize.FLOAT
    },
    initialDiseased: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 14
    },
    initialHealthy: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue:17
    },
    initialUnhealthy: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 51
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "Not Started"
    },
    startDate:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    stage: {
        type: Sequelize.STRING,
        defaultValue: "Stage 0"
    }
});

export default Project;