import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { connectDb } from "./config/connectdb.js";
import userRouter from "./routes/userRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(morgan("dev"));
connectDb(DATABASE_URL);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// //////////////////////////////////////////////
// authentication api's
app.use("/api/user/", userRouter);
app.use("/test", (req, res) => res.send("test ngrok server"));



app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
