import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage, status }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full  relative rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          {featuredImage ? (
            <img
              src={service.getFileView(featuredImage)}
              alt={`${title}'s Image`}
              className="w-full rounded-xl  object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 ">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
