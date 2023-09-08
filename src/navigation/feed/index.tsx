import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { TAB_FOLLOWING, TAB_FOR_YOU } from "@/navigation/feed/Tabs";
import FeedScreen from "@/screens/feed";
import { getNextFollowing } from "@/slices/followingFeed";
import { getNextForYou } from "@/slices/forYouFeed";

const FeedTab = createBottomTabNavigator();
const { width } = Dimensions.get("window");
export const TABS = [
  { id: TAB_FOLLOWING, name: "Following", components: FeedScreen },
  { id: TAB_FOR_YOU, name: "For You", components: FeedScreen },
];

const FeedNavigation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNextFollowing());
    dispatch(getNextForYou());
  }, []);

  const loading = useAppSelector(
    (state) =>
      state.following.feed[0]?.loading === "success" ||
      state.forYou.feed[0]?.loading === "success",
  );
  if (!loading) {
    return <ActivityIndicator />;
  }
  return (
    <FeedTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabelStyle: styles.tabBarTextStyle,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
      }}
    >
      {TABS.map((tab) => (
        <FeedTab.Screen
          name={tab.id}
          key={tab.id}
          component={tab.components}
          options={{
            title: tab.name,
          }}
        />
      ))}
    </FeedTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    top: 20,
    left: width / 2 - 100,
    width: 200,
    backgroundColor: "transparent",
    elevation: 0,
    borderTopWidth:0
  },
  tabBarIconStyle: {
    display: "none",
  },
  tabBarTextStyle: { fontSize: 14, fontWeight: "400" },
});

export default FeedNavigation;
