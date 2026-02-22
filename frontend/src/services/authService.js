import { supabase } from "./supabaseClient";
import useAuthStore from "../store/authStore";

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) throw error;
};

export const logout = async () => {
  await supabase.auth.signOut();
  useAuthStore.getState().logout();
  return { success: true };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};
