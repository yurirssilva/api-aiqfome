import express from "express";
import { sequelize } from "./database/database";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import YAML from 'yamljs';
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const app = express();
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async () => {
  await sequelize.sync({ force: true });
};

app.use(router);
app.use(errorHandler);


export { app };
