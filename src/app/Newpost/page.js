"use client";
import React, { useState } from "react";

const SocialMediaPostForm = () => {

  const [postObject, setPostObject] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
    isPublic: true,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "isPublic") {
      setPostObject({
        ...postObject,
        [e.target.name]: e.target.checked,
      });
      return;
    }

    const { name, value } = e.target;
    setPostObject({
      ...postObject,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Check if posts are already in local storage
    const localStoragePosts = localStorage.getItem("posts");
    
    // Validate post object
    if (!postObject.title || !postObject.content) {
      alert("Please fill in the title and content fields");
      return;
    }

    // Create post with unique ID
    const postWithId = {
      ...postObject,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    // Store in local storage
    if (localStoragePosts) {
      localStorage.setItem("posts", JSON.stringify([
        ...JSON.parse(localStoragePosts),
        postWithId
      ]));
    } else {
      localStorage.setItem("posts", JSON.stringify([postWithId]));
    }

    // Clear form after submission
    setPostObject({
      title: "",
      content: "",
      image: "",
      tags: "",
      isPublic: true,
    });
    
    alert("Post created successfully!");
  };

  return (
    
    <div className="mt-16 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg text-amber-800">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Create New Post</h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-amber-800 font-bold block">Post Title</label>
          <input
            className="w-full p-3 bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            name="title"
            placeholder="Enter post title"
            value={postObject.title}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-amber-800 font-bold block">Content</label>
          <textarea
            className="w-full p-3 bg-white border-2 border-amber-300 rounded-md h-16 focus:outline-none focus:ring-2 focus:ring-amber-400"
            name="content"
            placeholder="What's on your mind?"
            value={postObject.content}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-amber-800 font-bold block">Image URL</label>
          <input
            className="w-full p-3 bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            name="image"
            placeholder="Paste image URL (optional)"
            value={postObject.image}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-amber-800 font-bold block">Tags</label>
          <input
            className="w-full p-3 bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            name="tags"
            placeholder="Enter tags separated by commas"
            value={postObject.tags}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            className="h-5 w-5 text-amber-600 focus:ring-amber-500 rounded"
            type="checkbox"
            name="isPublic"
            checked={postObject.isPublic}
            onChange={handleInputChange}
          />
          <label className="text-amber-800">Public post</label>
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-6 bg-amber-400 text-amber-100 rounded-md shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default SocialMediaPostForm;
