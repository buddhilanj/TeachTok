import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import FeedNavigation from "../feed";

import { useAppColorProfile } from "@/hooks/colorHooks";
import ActivityScreen from "@/screens/activity";
import BookmarkScreen from "@/screens/bookmarks";
import DiscoverScreen from "@/screens/discover";
import ProfileScreen from "@/screens/profile";

interface IconProps {
  color: string;
  size: number;
}

interface Tabs {
  name: string;
  id: string;
  component: () => React.JSX.Element;
  icon: keyof typeof Ionicons.glyphMap;
}

const RootTab = createBottomTabNavigator();
export const TABS: Tabs[] = [
  {
    name: "Home",
    id: "HomeTab",
    component: FeedNavigation,
    icon: "home",
  },
  {
    name: "Discover",
    id: "DiscoverTab",
    component: DiscoverScreen,
    icon: "compass",
  },
  {
    name: "Activity",
    id: "ActivityTab",
    component: ActivityScreen,
    icon: "stopwatch",
  },
  {
    name: "Bookmarks",
    id: "BookmarksTab",
    component: BookmarkScreen,
    icon: "bookmark",
  },
  {
    name: "Profile",
    id: "ProfileTab",
    component: ProfileScreen,
    icon: "person-circle",
  },
];

const RootNavigation = () => {
  const colorProfile = useAppColorProfile();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        tabBarStyle: {
          backgroundColor: colorProfile.background_color,
        },
      }),
    [colorProfile],
  );
  return (
    <RootTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: colorProfile.text_color,
        tabBarInactiveTintColor: "grey",
      }}
    >
      {TABS.map((tab) => (
        <RootTab.Screen
          name={tab.id}
          key={tab.id}
          component={tab.component}
          options={{
            title: tab.name,
            tabBarIcon: ({ color, size }: IconProps) => (
              <Ionicons name={tab.icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </RootTab.Navigator>
  );
};

export default RootNavigation;
