import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { AnswerView } from "./MCQAnswerView";
import style from "./style";

import { MCQ } from "@/data";
import { getAnswer } from "@/services/getAnswer";

export interface MCQViewProps {
  mcq: MCQ;
}

const MemoizeAnswers = React.memo(AnswerView);
export const MCQView: React.FC<MCQViewProps> = ({ mcq }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const fetchAnswer = useCallback(async () => {
    const response = await getAnswer(`${mcq.id}`);
    const ans = response.data.correct_options?.[0]?.id ?? null;
    setAnswer(ans);
  }, [mcq.id, setAnswer]);

  useEffect(() => {
    fetchAnswer();
  }, [fetchAnswer]);

  const handleOnSelectAnswer = useCallback(
    (id: string) => {
      setSelected(id);
    },
    [setSelected],
  );

  return (
    <View style={style.container}>
      <>
        <Text style={style.front}>{mcq.question}</Text>
        <View style={style.seperator} />
        {!!mcq &&
          mcq.options?.map((option) => (
            <MemoizeAnswers
              key={option.id}
              id={option.id}
              answer={option.answer}
              isCorrect={!!selected && option.id === answer}
              onPressAnswer={handleOnSelectAnswer}
            />
          ))}
      </>
    </View>
  );
};
