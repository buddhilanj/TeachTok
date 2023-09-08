import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  correct_answer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    opacity: 0.3,
  },
  container: {
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 5,
    margin: 5,
  },
  overlay: {
    borderRadius: 5,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.3,
  },
  answer_text_wrapper: { paddingHorizontal: 5, paddingVertical: 10 },
  answer_text: {
    fontWeight: "600",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default styles;
