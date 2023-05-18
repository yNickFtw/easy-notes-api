import { Sequelize } from "sequelize";
const sequelize = new Sequelize("easynotes", "easynotes", "Delore23Nicolas1", {
  dialect:'mysql',
  dialectModule: require('mysql2'),
  host: "mysql.easynotes.kinghost.net",
});

export default sequelize;
