import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-[100%] h-[100%] py-8 flex flex-col items-center justify-center px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold text-white drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl sm:text-3xl mt-4 text-gray-300 font-semibold"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-200 mt-2 max-w-md"
      >
        The page you're looking for doesn't exist or has been moved. Don't
        worry, let’s take you back!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#ff7a59] hover:bg-[#ff5c35] text-white font-medium rounded-lg transition duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
