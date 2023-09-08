import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import styles from "./style";

const { width: REVEALED_WIDTH } = Dimensions.get("window");
const UNREVEALED_WIDTH = 0;

export interface AnswerViewProps {
  id: string;
  answer: string;
  isCorrect: boolean;
  onPressAnswer: (id: string) => void;
}

export const AnswerView: React.FC<AnswerViewProps> = ({
  id,
  answer,
  isCorrect,
  onPressAnswer,
}) => {
  const position = useSharedValue(0);
  useEffect(() => {
    if (isCorrect) {
      position.value = withTiming(1);
    }
  }, [isCorrect, position]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: interpolate(
        position.value,
        [0, 1],
        [REVEALED_WIDTH, UNREVEALED_WIDTH],
      ),
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <TouchableOpacity onPress={() => onPressAnswer(id)}>
        <Animated.View style={[styles.correct_answer, animatedStyles]} />
        <View style={styles.answer_text_wrapper}>
          <Text style={styles.answer_text}>{answer}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
