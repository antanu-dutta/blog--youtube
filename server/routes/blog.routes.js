import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComment,
  togglePublish,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, upload.single("image"), addBlog);
router.get("/all", getAllBlogs);
router.get("/:blogId", getBlogById);
router.delete("/:blogId", deleteBlogById);
router.post("/:blogId", auth, togglePublish);

router.post("/add-comment", addComment);
router.get("/comments", getBlogComment);

export default router;
