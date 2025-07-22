import express from "express";
import cors from "cors";
import gymRouter from "./routes/gym.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/gym", gymRouter);

app.listen(port, () => {
  console.log(`Sto ascoltando il server alla porta http://localhost:${port}`);
});
