import jwt from "jsonwebtoken";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({
      createdAt: -1,
    });
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server error" });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = { recentBlogs, blogs, comments, drafts };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server error" });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);

    // delete all comment associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Comment Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server error" });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment Approved" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server error" });
  }
};
