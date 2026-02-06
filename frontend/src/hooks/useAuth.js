import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        if (isMounted) {
          setUser(data.user || null);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
};

export default useAuth;
