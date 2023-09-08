import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");
const fullscreenHeight = height - (Platform.OS === "ios" ? 69 : 50);
const style = StyleSheet.create({
  container: {
    height: fullscreenHeight,
  },
  contentWrapper: { flexDirection: "row", flex: 1 },
  content: {
    flex: 1,
  },
  rightBarWrapper: {
    justifyContent: "flex-end",
  },
  rightIconBar: { alignContent: "space-around" },
  bottomFooter: { padding: 10 },
  playlist: { padding: 5, paddingLeft: 10 },
  wrapperContainer: {
    height: fullscreenHeight,
    width,
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
});

export default style;
