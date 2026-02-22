import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { supabase } from "../services/supabaseClient";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user, data.session.access_token);
        navigate("/org/dashboard");
      } else {
        navigate("/auth/google");
      }
    };
    checkSession();
  }, [navigate, setUser]);

  return null;
};

export default GoogleAuthSuccess;
