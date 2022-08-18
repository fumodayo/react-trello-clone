import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "./config/environment";

connectDB()
  .then(() => console.log("Connected success to databases server!"))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.get("/", async (req, res) => {
    res.end("<h1>Hello</h1>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello running ${env.APP_HOST}:${env.APP_PORT}`);
  });
};
