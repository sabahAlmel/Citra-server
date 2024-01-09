import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// express app
const app = express();
app.use(express.json());

app.use(cors());
app.use("/images", express.static("images"));
async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();
