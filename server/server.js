import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import gymRouter from "./routes/gym.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/gym", gymRouter);

app.listen(port, () => {
  console.log(`Sto ascoltando il server alla porta http://localhost:${port}`);
});
