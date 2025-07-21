import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

const DUMMY_EMAIL = "abcd@gmail.com";
const DUMMY_PASSWORD = "111111";

type AuthState = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  passwordReset: (email: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: () => false,
  signup: () => false,
  passwordReset: () => false,
  logout: () => { },
});

function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO Define login logic
  const login = (
    email: string,
    password: string
  ) => {
    // TODO Dummy login logic (replace with real API later)
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }

    return false;
  };

  // TODO Define signup logic
  const signup = (
    email: string,
    password: string
  ) => {
    if (!(email && password)) return false;

    // TODO Dummy signup logic (replace with real API later)
    return true;
  };

  // TODO Define password reset logic
  const passwordReset = (
    email: string
  ) => {
    if (email) {
      // TODO Simulate password reset
      return true;
    }

    return false;
  };

  // TODO Define logout logic
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, signup, passwordReset }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider }
