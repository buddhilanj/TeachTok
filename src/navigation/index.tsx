import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import RootStack from "./root";
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
