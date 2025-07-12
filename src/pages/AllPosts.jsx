import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="py-8 w-full ">
      {posts.length > 0 ? (
        <Container>
          <div className="flex flex-wrap gap-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4 border rounded-2xl">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div className="py-8 w-full mt-4 text-center h-[35vh]">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-500 transition duration-300 ease-in-out animate-fade-in">
            There are no posts
          </h1>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
