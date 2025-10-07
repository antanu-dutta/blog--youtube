import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/admin.routes.js";
import blogRouter from "./routes/blog.routes.js";
dotenv.config();

// ! database connection
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ! middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ! rest api
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
