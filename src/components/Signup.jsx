import React, { useState } from "react";
import authService from "../appwrite/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Select } from "./index";
import { login } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { RingLoader } from "react-spinners";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signUpHandler = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      setLoading(userData);
      if (userData) {
        const userData = await authService.getCurrentUser();
        dispatch(login(userData));
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Appwrite service error signUp Component", error);
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
            Create your account
          </h2>

          {error && <p className="text-red-600 mt-8">{error}</p>}
          <form onSubmit={handleSubmit(signUpHandler)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Full Name : "
                type="text"
                placeholder="Enter your full name"
                className="w-full focus:bg-[#c57460] duration-200 transition-all "
                {...register("name", {
                  required: true,
                })}
                error={errors.name?.message}
              />
              <Input
                label="Email : "
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="w-full focus:bg-[#c57460] duration-200 transition-all  "
                {...register("password", {
                  required: true,
                })}
                error={errors.password?.message}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to={"/login"}
                className="font-medium text-primary hover:underline transition-all duration-200"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
