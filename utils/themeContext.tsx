"use client";

import { ColorSchemeName, useColorScheme } from "react-native";
import { createContext, PropsWithChildren, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeState = {
  theme: ColorSchemeName;
  changeTheme: (theme: ColorSchemeName) => void;
};

export const ThemeContext = createContext<ThemeState>({
  theme: "light",
  changeTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeState["theme"]>("light");

  const changeTheme = (theme: ThemeState["theme"]) => {
    setTheme(theme === null || theme === undefined ? useColorScheme() : theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
