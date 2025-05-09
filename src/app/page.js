"use client";
import React, { useState, useEffect } from "react";

// Post component to display individual posts
const Post = ({ id, title, content, image, tags, createdAt, likes, isPublic }) => {
  const [likeCount, setLikeCount] = useState(likes || 0);
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
  
  const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
  const handleLike = () => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);
    
    // Update like count in localStorage
    const localStoragePosts = localStorage.getItem("posts");
    if (localStoragePosts) {
      const posts = JSON.parse(localStoragePosts);
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return { ...post, likes: newLikeCount };
        }
        return post;
      });
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-xl text-amber-600 ">
      <div className="flex items-center mb-4">
        <div className="bg-amber-400 rounded-full h-10 w-10 flex items-center justify-center text-amber-100 font-bold">
          {title.charAt(0).toUpperCase()}
        </div>
        <div className="ml-3">
          <h3 className="font-bold text-lg text-amber-700">{title}</h3>
          <p className="text-sm">{formattedDate}</p>
        </div>
        {isPublic === false && (
          <span className="ml-auto bg-gray-200 px-2 py-1 rounded-full text-xs">Private</span>
        )}
      </div>
      
      <p className="mb-4">{content}</p>
      
      {image && (
        <div className="mb-4">
          <img 
            src={image} 
            alt="Post image" 
            className="rounded-lg w-full h-64 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/400/320";
              e.target.alt = "Image could not be loaded";
            }}
          />
        </div>
      )}
      
      {tagArray.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tagArray.map((tag, index) => (
            <span key={index} className="bg-amber-100  px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center mt-4">
        <button 
          onClick={handleLike}
          className="flex items-center  hover:text-amber-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likeCount}
        </button>
        <button className="flex items-center  hover:text-amber-500 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>
        <button className="flex items-center  hover:text-amber-500 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve posts from localStorage
    const fetchPosts = () => {
      const localStoragePosts = localStorage.getItem("posts");
      if (localStoragePosts) {
        // Parse posts and sort by creation date (newest first)
        const parsedPosts = JSON.parse(localStoragePosts);
        parsedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(parsedPosts);
      }
      setLoading(false);
    };

    // Add a small delay to ensure localStorage is accessible
    // (especially important in SSR environments)
    setTimeout(fetchPosts, 100);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="pt-8">
    <div className="flex flex-col items-center p-4 mt-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-8">Your Feed</h1>
      
      {posts.length === 0 ? (
        <div className="bg-amber-50 rounded-lg p-6 text-center shadow-md w-full max-w-xl">
          <h3 className="text-xl font-medium text-amber-600 mb-2">No posts yet</h3>
          <p className="text-amber-600">Create your first post to get started!</p>
        </div>
      ) : (
        posts.map(post => (
          <Post 
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            image={post.image}
            tags={post.tags}
            createdAt={post.createdAt}
            likes={post.likes}
            isPublic={post.isPublic}
          />
        ))
      )}
      </div>
    </div>
  );
}
