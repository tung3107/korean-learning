import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

function ProtectedAdmin() {
  const { isLoading, isAuthenticated, isUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast.success("Hãy đăng nhập trước khi vào khóa học!");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated && !isUser) return <Outlet />;
  if (isUser) return <Navigate to="/app" />;
}

export default ProtectedAdmin;
