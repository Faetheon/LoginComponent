require('dotenv').config();
const Sequelize = require('sequelize');

const dbUrl = process.env.DB_URL;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres'
});

const users = sequelize.define('user', {
  username: {
    type: Sequelize.TEXT,
    unique: true
  },
  email: {
    type: Sequelize.TEXT,
    unique: true
  },
  user_password: {
    type: Sequelize.TEXT
  }
}, {
  underscored: true
});

sequelize.sync().then(() => {
  users.create()
}).catch((err) => {
  console.log(err);
});