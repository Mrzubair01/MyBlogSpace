import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { RingLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { Footer, Header } from "./components/index";
import MainRoutes from "./routes/MainRoutes";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        toast.error(
          error.message,
          "Error message comes from getCurrentUser in App"
        );
      })
      .finally(() => {
        toast.success("Ready to go");
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className="w-full block text-white">
        <Header />
        <main>
          <MainRoutes />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center  ">
      <RingLoader color="#fff" />
    </div>
  );
}

export default App;
