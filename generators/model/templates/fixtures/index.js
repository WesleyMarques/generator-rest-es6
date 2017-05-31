//jshint esversion:6
const sequelize_fixtures = require('sequelize-fixtures');
const fixtures = path.join(__dirname, './*.json');
const dbConfig = require('../config/config.json').development;

const models = require('./models')(dbConfig);
sequelizeFixtures.loadFile(fixtures, database.models).then(() => {

});
