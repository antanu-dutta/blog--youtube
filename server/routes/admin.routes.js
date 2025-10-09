import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllComments,
} from "../controllers/admin.controller.js";
import { getAllBlogs } from "../controllers/blog.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/comments", auth, getAllComments);
router.get("/blogs", auth, getAllBlogs);
router.delete("/:id", deleteCommentById);
router.post("/:id", approveCommentById);

export default router;
