import { useKeyboardHeight } from "~/hooks/useKeyboardHeight";
import Animated from "react-native-reanimated";
import React from "react";
import { Platform } from "react-native";

export const KeyboardSpacer = () => {
  const { keyboardHeight } = useKeyboardHeight();
  return Platform.OS === "ios" ? (
    <Animated.View style={keyboardHeight} />
  ) : (
    <></>
  );
};
