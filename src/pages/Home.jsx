import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { RingLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const userLoginCheck = useSelector((state) => state.auth.status);
  const userId = useSelector((state) => state.auth.userData);
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPostsByUser(userId?.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (userLoginCheck) {
    if (posts.length === 0 && loader) {
      return (
        <div className="w-full h-screen flex items-center justify-center  ">
          <RingLoader color="#fff" />
        </div>
      );
    } else if (posts.length === 0) {
      return (
        <div className="py-8 w-full mt-4 text-center h-[38vh]">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1
                  className="
          text-2xl 
          font-bold 
          text-gray-800 
          hover:text-gray-500 
          transition 
          duration-300 
          ease-in-out 
          animate-fade-in
        "
                >
                  There are no post yet
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap gap-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4 border rounded-2xl">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="py-8 w-full mt-4 text-center h-[38vh]">
      <Container>
        <div className="flex flex-wrap ">
          <div className="p-2 w-full ">
            <div className="w-[100%] h-[100%] py-8 flex flex-col items-center justify-center px-4 text-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-extrabold text-gray-800  hover:text-gray-500 transition duration-300 ease-in-out animate-fade-in drop-shadow-lg"
              >
                Please Login to see the posts :
                <Link to="/login" className="text-blue-500">
                  {" "}
                  Login
                </Link>
              </motion.h1>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
