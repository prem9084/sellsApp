import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/Database.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/ProdeuctRoute.js";
import bodyParser from "body-parser";
// config env

dotenv.config();

connectDB();

// rest object
const app = express();

//midddelwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);

app.listen(PORT, () => {
  console.log(`server listening on port${PORT}`);
});
