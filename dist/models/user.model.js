"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
});
exports.User = User;
