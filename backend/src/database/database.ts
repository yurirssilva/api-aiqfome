import {Sequelize} from 'sequelize-typescript';

const config = require("./config/db");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
sequelize.addModels([__dirname + '/models/*']);
export { sequelize }
