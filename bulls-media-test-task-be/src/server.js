import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  register,
  login,
  getUserCredentialsById,
  updateUserCredentials,
} from "./controllers/UserController.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/:id", getUserCredentialsById);
app.patch("/api/login/:id", updateUserCredentials);

app.listen(process.env.PORT, () => {
  console.log("Server OK");
});
