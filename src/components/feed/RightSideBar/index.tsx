import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ButtonIcons, UserAccountButton } from "@/components/general";

interface RightSideBarProps {
  userImageURI: string;
}

interface ContentIconsButtonProps {
  id: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const icons: ContentIconsButtonProps[] = [
  { id: "like", text: "20", icon: "heart" },
  { id: "comment", text: "20", icon: "chatbubble-ellipses" },
  { id: "bookmark", text: "20", icon: "bookmark" },
  { id: "forward", text: "20", icon: "arrow-redo" },
];

export default function RightSideBar({ userImageURI }: RightSideBarProps) {
  return (
    <View style={styles.rightBarWrapper}>
      <View style={styles.rightIconBar}>
        <UserAccountButton uri={userImageURI} />
        {icons.map((icon) => (
          <ButtonIcons icon={icon.icon} label={icon.text} key={icon.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rightBarWrapper: {
    justifyContent: "flex-end",
  },
  rightIconBar: { alignContent: "space-around" },
});
