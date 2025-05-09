 "use client";
import { useState } from "react";
const Post = ({ name, statusText, initialLikeCount }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);

  const handleLike = () => {
    setLikeCount(likeCount + 1)
  }

 
 return (
    <div className={`flex flex-col gap-4 p-4 w-1/3 rounded-md shadow-md shadow-amber-200`}>
      <h2>{name}</h2>
      <p className="text-2xl font-bold">{statusText}</p>
      <p className="text-2xl">❤️ {likeCount}</p>
      <p className="text-red-400">

      </p>



      <button
        className="bg-amber-400 text-white p-2 rounded-md"
        onClick={() => handleLike()}
      >
        Like
      </button>
    </div>
  );
};

export default Post;