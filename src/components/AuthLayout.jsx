import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      // toast.error("You are not logged in from AuthLayout");
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      // toast.success("You are logged in from AuthLayout");
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="w-full h-screen flex items-center justify-center  ">
      <RingLoader color="#fff" />
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
