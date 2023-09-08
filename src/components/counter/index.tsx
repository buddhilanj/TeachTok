import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, AppState, AppStateStatus } from "react-native";

import { useAppColorProfile } from "@/hooks/colorHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { endTimer, startTimer } from "@/slices/timer";

const DISPLAY_TIMER_UPDATE_INTERVAL = 60000;

export default function CounterController() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [displayTime, setDisplayTime] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { timeTotal, startTime } = useAppSelector((state) => state.timer);
  const colorProfile = useAppColorProfile();
  const colorStyle = useMemo(
    () =>
      StyleSheet.create({
        timeText: { color: colorProfile.text_color },
      }),
    [colorProfile],
  );
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    const timerId = setInterval(
      updateDisplayTime,
      DISPLAY_TIMER_UPDATE_INTERVAL,
    );
    return () => {
      dispatch(endTimer());
      subscription.remove();
      clearInterval(timerId);
    };
  }, []);

  const updateDisplayTime = () => {
    if (appState === "active") {
      const currentTime = Math.abs(
        new Date(startTime).getTime() - new Date().getTime(),
      );
      setDisplayTime(timeTotal + currentTime);
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState !== nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        dispatch(startTimer());
      } else if (
        appState === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        dispatch(endTimer());
      }
      setAppState(nextAppState);
    }
  };
  return (
    <View style={styles.timerWrapper}>
      <Ionicons name="stopwatch" size={15} color={colorProfile.text_color} />
      <Text style={[colorStyle.timeText, styles.text]}>
        {formatDuration(displayTime)}
      </Text>
    </View>
  );
}

function formatDuration(durationInMilliseconds: number): string {
  const millisecondsPerHour = 3600000;
  const millisecondsPerMinute = 60000;

  // Calculate hours and minutes
  const hours = Math.floor(durationInMilliseconds / millisecondsPerHour);
  const minutes = Math.floor(
    (durationInMilliseconds % millisecondsPerHour) / millisecondsPerMinute,
  );

  // Build the formatted string
  const hoursFormat = hours ? `${hours}h ` : "";
  const formattedDuration = `${hoursFormat}${minutes}m`;

  return formattedDuration;
}

const styles = StyleSheet.create({
  timerWrapper: {
    position: "absolute",
    height: 20,
    top: 35,
    left: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
});
