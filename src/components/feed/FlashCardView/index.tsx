import React from "react";
import { View, Text } from "react-native";

import style from "./style";

import { FlashCard } from "@/data";

export interface FlashCardProps {
  flashcard: FlashCard;
}

export const FlashCardView: React.FC<FlashCardProps> = ({ flashcard }) => {
  return (
    <View style={style.container}>
      <Text style={style.flashcard}>{flashcard.flashcard_front}</Text>
    </View>
  );
};
