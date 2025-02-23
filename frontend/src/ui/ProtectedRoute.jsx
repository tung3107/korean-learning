import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useAuth } from "../hook/useAuth";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated, isUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast.success("Hãy đăng nhập trước khi vào khóa học!");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated && isUser) return children;
  if (!isUser) return <Navigate to="/admin" />;
}

export default ProtectedRoute;
