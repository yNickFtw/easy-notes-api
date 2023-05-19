import { Sequelize, DataTypes } from "sequelize";
import database from "../db/connection";

const Note = database.define("note", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
  },
  description: {
    type: DataTypes.STRING(100),
  },
  content: {
    type: DataTypes.TEXT,
  },
  isSaved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export { Note };
