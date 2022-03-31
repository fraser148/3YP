const Project = (sequelize, Sequelize) => sequelize.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    surveyName: {
        type: Sequelize.STRING
    },
    timeLimit:{
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
    intialDiseased: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 23
    },
    intialHealthy: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue:27
    },
    intialUnhealthy: {
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
        type: Sequelize.STRING
    }
});

export default Project;