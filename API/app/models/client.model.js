const Client = (sequelize, Sequelize) => sequelize.define("clients", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    address1: {
        type: Sequelize.STRING
    },
    address2: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    postcode: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    client_lat: {
        type: Sequelize.DECIMAL(22,18)
    },
    client_lng: {
        type: Sequelize.DECIMAL(22,18)
    }
});

export default Client;