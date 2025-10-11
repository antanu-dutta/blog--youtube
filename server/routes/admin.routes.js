import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin); // ! login route
router.get("/comments", auth, getAllComments); // ! getting all comments route
router.get("/blogs", auth, getAllBlogsAdmin); // ! getting all blogs route
router.delete("/:id", deleteCommentById); // ! deleting comment by id route
router.post("/approve/:id", approveCommentById); // ! approving comment by id route
router.get("/dashboard", auth, getDashboard);

export default router;
