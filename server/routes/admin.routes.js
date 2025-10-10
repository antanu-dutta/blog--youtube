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

router.post("/login", adminLogin); // ! login route
router.get("/comments", auth, getAllComments); // ! getting all comments route
router.get("/blogs", auth, getAllBlogs); // ! getting all blogs route
router.delete("/:id", deleteCommentById); // ! deleting comment by id route
router.post("/:id", approveCommentById); // ! approving comment by id route

export default router;
