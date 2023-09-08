import { useColorScheme } from "react-native";

import DarkColors from "@/styles/colors/dark";
import LightColors from "@/styles/colors/light";

export function useAppColorProfile() {
  const mode = useColorScheme();
  return mode === "dark" ? DarkColors : LightColors;
}
