"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Note = connection_1.default.define("note", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
    },
    isSaved: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
});
exports.Note = Note;
