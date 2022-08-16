import express from "express";
import { mapOrder } from "*/utilities/sorts";

const app = express();

const hostname = "localhost";
const port = 8017;

app.get("/", (req, res) => {
  res.end("<h1>Hello</h1>");
});

app.listen(port, hostname, () => {
  console.log(`Hello running ${hostname}:${port}`);
});
