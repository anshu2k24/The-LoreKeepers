import express from "express";
import { PORT } from "./config.js";
import { mongoUrl } from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const port = PORT;
const mongourl = mongoUrl;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log("An error occured - ", error.message);
  });

app.listen(port, () => {
  console.log(`Server started -> Listening to Port : ${port}`);
});

// Set up a simple route to test if the server works
app.get('/', (req, res) => {
  res.send('Hello, StudyAI Backend is running!');
});
