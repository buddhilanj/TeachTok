import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useAppColorProfile } from "@/hooks/colorHooks";
interface ButtonIconProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

export const ButtonIcons: React.FC<ButtonIconProps> = ({
  icon,
  label,
  onPress,
}) => {
  const color = useAppColorProfile();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Ionicons name={icon} size={30} color={color.text_color} />
        <Text style={{ color: color.text_color }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
});
