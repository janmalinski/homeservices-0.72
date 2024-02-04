import { createContext } from "react";
import { ColorSchemeName } from "react-native";

type TTheme = {
    theme:  ColorSchemeName;
    setTheme: (theme: ColorSchemeName) => void;
} | null;

export const ThemeContext = createContext<TTheme>(null);