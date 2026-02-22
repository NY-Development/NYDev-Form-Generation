import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // Optionally decode token for user info
      setUser({ token }, token);
      navigate("/org/dashboard");
    } else {
      navigate("/google-signin");
    }
  }, [navigate, setUser]);

  return null;
};

export default GoogleAuthSuccess;
