import React from "react";
import { useDispatch } from "react-redux";
import authServices from "../../appwrite/auth";
import { logout } from "../../features/authSlice";
import { toast } from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authServices
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error(
          error.message,
          "Error message comes from logoutHandler in LogoutBtn"
        );
      });
  };
  return (
    <div onClick={logoutHandler}>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 active:scale-95 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#ff7a59] hover:bg-[#ff5c35] duration-500 transition px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <LogOut /> Logout
        </span>
      </button>
    </div>
  );
}

export default LogoutBtn;
