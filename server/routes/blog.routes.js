import express from "express";
import { addBlog } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, upload.single("image"), addBlog);

export default router;
