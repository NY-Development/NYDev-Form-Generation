import useAuthStore from "../store/authStore";

const useAuth = () => {
  const { user, token, setUser, logout } = useAuthStore();
  return { user, token, setUser, logout };
};

export default useAuth;
