import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import FeedNavigation from "@/navigation/feed";
import UserScreen from "@/screens/user";

const Home = createStackNavigator();
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

export default function HomeStack() {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      {stacks.map((stack) => (
        <Home.Screen
          key={stack.name}
          name={stack.name}
          component={stack.component}
        />
      ))}
    </Home.Navigator>
  );
}
