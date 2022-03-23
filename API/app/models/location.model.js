const Location = (sequelize, Sequelize) => sequelize.define("locations", {
    location_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lat: {
        type: Sequelize.DECIMAL(22,18)
    },
    lng: {
        type: Sequelize.DECIMAL(22,18)
    }
});

export default Location;