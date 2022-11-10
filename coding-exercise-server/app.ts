import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import router from "./routes";
import sequelizeConfig from "./db";

const PORT = process.env.PORT || 5000;

const app = express();

const whitelist = ["http://localhost:4200"];

const corsOptions = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

const runServer = async () => {
  try {
    await sequelizeConfig.authenticate();
    await sequelizeConfig.sync();

    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

runServer();
