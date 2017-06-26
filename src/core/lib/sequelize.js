const Sequelize = require('sequelize');

const sequelize = new Sequelize('loucosfc', 'loucosfc', 'loucosfc', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 25,
  },
});

module.exports = sequelize;
