import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { marked } from "marked";
import { GET_AI_DESCRIPTION } from "../../config/gemini";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      // Create blog object
      const blog = {
        title,
        subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      // Create FormData
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog)); // send all text data as JSON string
      formData.append("image", image); // append image file

      // Send formData (not the plain object)
      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    try {
      if (!title) return toast.error("Please enter a title");
      setIsGenerating(true);
      const text = await GET_AI_DESCRIPTION(title);
      quillRef.current.root.innerHTML = marked.parse(text);
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16 rounded cursor-pointer"
            alt=""
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
        </label>
        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={title}
          className="w-full max-w-lg p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mt-4">Subtitle</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={subtitle}
          className="w-full max-w-lg p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <p className="mt-4">Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            onClick={generateContent}
            disabled={isGenerating}
            className="disabled:bg-black/90 absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            {isGenerating ? "Generating..." : " Generate with AI"}
          </button>
        </div>
        <p className="mt-4">Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name=""
          id=""
          className="mt-2 px-3  py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((cat, idx) => {
            return (
              <option key={idx} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary disabled:bg-primary/50 text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : " Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
