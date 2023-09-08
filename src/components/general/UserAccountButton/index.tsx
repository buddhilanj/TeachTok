import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
interface UserAccountButtonProps {
  uri: string;
}

export const UserAccountButton: React.FC<UserAccountButtonProps> = ({
  uri,
}) => {
  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <Image style={styles.icon} source={{ uri }} />
      </View>
      <View style={styles.iconWrapper}>
        <Ionicons name="add" size={15} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    marginBottom: 10,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  icon: { height: 40, width: 40 },
  iconWrapper: {
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
    marginTop: -10,
  },
});
