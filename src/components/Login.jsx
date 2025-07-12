import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      setLoading(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Appwrite service error login Component", error);
      setError(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center ">
      {loading ? (
        <div className={`w-full h-[60vh] flex justify-center items-center`}>
          <RingLoader color="#fff" />
        </div>
      ) : (
        <div
          className={`mx-auto w-full max-w-lg bg-[#ff7a59] rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center ">
            {/* <span className="inline-block w-full max-w-[100px]"> */}
            <h1 className="text-2xl font-bold text-white"> Blog App</h1>
            {/* </span> */}
          </div>
          <h2 className="text-2xl font-bold text-white text-center leading-tight">
            Log in to your account
          </h2>

          {error && <p className="text-red-600 mt-8">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email : "
                type="email"
                placeholder="Email"
                className="w-full focus:bg-[#c57460] duration-200 transition-all "
                {...register("email", {
                  required: true,
                  validate: {
                    matchpattern: (value) => {
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Please enter a valid email address.";
                    },
                  },
                })}
                error={errors.email?.message}
              />
              <Input
                label="Password : "
                type="password"
                placeholder="Password"
                className="w-full focus:bg-[#c57460] duration-200 transition-all  "
                {...register("password", {
                  required: true,
                })}
                error={errors.password?.message}
              />
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </div>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have an account?&nbsp;
              <Link
                to={"/signup"}
                className="font-medium text-primary hover:underline transition-all duration-200"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
