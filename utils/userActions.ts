import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { AuthContextType } from "./authContext";

export function isLoggedIn(user: AuthContextType["user"]) {
  return user !== null
}

export async function login(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}

export async function signup(email: string, password: string, name: string,) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCred.user, { displayName: name })
    return { success: true, user: userCred.user }
  } catch (error) {
    console.error("Sign up failed: ", error);
    return { success: false, error };
  }
}

export async function passwordLessLogin(email: string) {
  try {
    // if user forgets password then a code is sent to the user's email
    // which is used to login
    return { success: true };
  } catch (error) {
    console.error("Sign up failed: ", error);
    return { success: false, error };
  }
}
