import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const { axios } = useAppContext();
  const BlogDate = new Date(createdAt);

  const handleDeleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.delete(`/api/blog/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleTogglePublish = async () => {
    try {
      const { data } = await axios.post(`/api/blog/toggle/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-800" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          className="border px-2 py-0.5 rounded cursor-pointer"
          onClick={handleTogglePublish}
        >
          {blog.isPublished ? "Unpublished" : "Publish"}
        </button>
        <img
          onClick={handleDeleteBlog}
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt=""
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
