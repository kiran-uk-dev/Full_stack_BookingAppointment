const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'booking_appointment',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;