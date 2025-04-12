import { useKeyboardHeight } from "~/hooks/useKeyboardHeight";
import Animated from "react-native-reanimated";
import React from "react";

export const KeyboardSpacer = () => {
  const { keyboardHeight } = useKeyboardHeight();
  return <Animated.View style={keyboardHeight} />;
};
