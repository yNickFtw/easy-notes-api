"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const association_1 = __importDefault(require("./models/association"));
const routes_1 = require("./routes/");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.router);
const port = 8080;
association_1.default.init(() => {
    connection_1.default
        .sync({ force: false })
        .then(() => {
        console.log("Connection has been established successfully.");
    })
        .catch((err) => {
        console.log("Wops! Something went wrong: " + err);
    });
});
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
