import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/note/index.js";
import userRouter from "./routes/user/index.js";
import { errorHandler } from "./middleware/error";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
