import express from "express";
import cors from "cors";
import sequelize from "./db/connection";
import association from "./models/association";
import { router } from "./routes/";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = 21195;

association.init(() => {
  sequelize
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
