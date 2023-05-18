import { Sequelize } from "sequelize";
const sequelize = new Sequelize("easynotes", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
