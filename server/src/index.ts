import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FinancialRecordRouter from "./routes/financial-records";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const mongoURI: string = process.env.MONGO_URI as string;

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/financial-records", FinancialRecordRouter);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
