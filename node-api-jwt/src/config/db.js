const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jokast38_bnk', 'jokast38_admin', '7vu.7wciUJ$5Zws', {
  host: 'mysql-jokast38.alwaysdata.net',
  dialect: 'mysql',
  timezone: '+00:00',
  logging: false,
});

async function connexion() {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexion();

module.exports = sequelize;
