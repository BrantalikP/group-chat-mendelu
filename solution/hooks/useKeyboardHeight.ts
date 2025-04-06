import { useEffect } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useKeyboardHeight = () => {
  const height = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const onKeyboardDidShow = (e: KeyboardEvent) => {
      "worklet";
      height.value = withTiming(Math.max(e.endCoordinates.height - bottom, 0));
    };

    const onKeyboardDidHide = () => {
      "worklet";
      height.value = withTiming(Math.max(0));
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      onKeyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHeight = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
    };
  }, []);

  return { keyboardHeight };
};
