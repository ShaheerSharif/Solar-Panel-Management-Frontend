import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // TODO: Define login logic
  const logIn = (email: string, password: string) => {
    if (email && password) {
      // Authenticate user
      setIsLoggedIn(true);
      router.replace("/(tabs)");
    } else {
      console.warn("Email and password required");
    }
  };

  // TODO: Define logout logic
  const logOut = () => {
    setIsLoggedIn(false);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
