"use client";

import { ColorSchemeName, useColorScheme } from "react-native";
import { createContext, PropsWithChildren, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function selectSystemTheme(): "light" | "dark" {
  const theme = useColorScheme();
  return !theme || theme === "light" ? "light" : "dark";
}

type ThemeState = {
  themeName: "light" | "dark" | "system";
  mode: "light" | "dark";
  changeTheme: (mode: ThemeState["themeName"]) => void;
};

export const ThemeContext = createContext<ThemeState>({
  themeName: "system",
  mode: selectSystemTheme(),
  changeTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeName, setThemeName] = useState<ThemeState["themeName"]>("system");
  const [mode, setMode] = useState<ThemeState["mode"]>(selectSystemTheme());

  const changeTheme = (theme: ThemeState["themeName"]) => {
    setThemeName(theme);
    setMode(theme === "system" ? selectSystemTheme() : theme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, mode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
