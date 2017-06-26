const Sequelize = require('sequelize');
const sequelize = require('../../core/lib/sequelize');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync();

module.exports = User;
