import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import FeedNavigation from "@/navigation/feed";
import UserScreen from "@/screens/user";

const App = createStackNavigator();
const stacks = [
  {
    name: "FeedScreen",
    component: FeedNavigation,
  },
  {
    name: "UserScreen",
    component: UserScreen,
  },
];

export default function AppStack() {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      {stacks.map((stack) => (
        <App.Screen
          key={stack.name}
          name={stack.name}
          component={stack.component}
        />
      ))}
    </App.Navigator>
  );
}
