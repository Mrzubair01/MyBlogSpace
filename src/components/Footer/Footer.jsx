import { motion } from "framer-motion";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#fac0aa] text-[#333] px-6 md:px-20 py-16 border-t border-neutral-200 "
    >
      <div className="grid md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold mb-2">
            <Link to="/">Blog-App.com</Link>
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            A full-stack Blog Application where users can sign up, log in, view
            posts from other users, and create their own blog posts.
            Authenticated users have full control over their content, including
            the ability to edit and delete their posts. Implemented secure user
            authentication and CRUD operations using Appwrite as the backend
            service.
          </p>
          <div className="flex gap-4 text-neutral-700">
            <Link to="https://www.instagram.com/mr.zubair__01/" target="_blank">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition" />
            </Link>
            <Link to="#">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
            </Link>
            <Link to="#">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-500 transition" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/zubair-alam-/"
              target="_blank"
            >
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-800 transition" />
            </Link>
            <Link to="https://github.com/Mrzubair01" target="_blank">
              <Github className="w-5 h-5 cursor-pointer hover:text-black transition" />
            </Link>
            <Link to="#">
              <Dribbble className="w-5 h-5 cursor-pointer hover:text-pink-500 transition" />
            </Link>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-base font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link to="#" className="hover:underline">
                Overview
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Integrations
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Marketing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-base font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link to="#" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Team
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-base font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-neutral-600 mb-2">
            Get updates right in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-neutral-300 bg-white placeholder:text-neutral-500 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ff7a59] w-full"
            />
            <button className="bg-[#ff7a59] hover:bg-[#ff5c35] text-white px-4 py-2 rounded-md text-sm cursor-pointer">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            By submitting, you agree to our{" "}
            <Link to="/privacy-policy" className="underline text-[#ff7a59]">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-neutral-500">
        <p>
          <span className="text-[#ff5c35] font-semibold">Blog-App.com</span> ©
          All rights reserved.
        </p>
        <p className="mt-2 md:mt-0">
          Made with <span className="text-pink-500">♥</span> by{" "}
          <Link to="#" className="text-[#ff5c35]">
            @blogapp
          </Link>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
