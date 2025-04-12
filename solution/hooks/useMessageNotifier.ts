import { useEffect, useRef } from "react";
import { Vibration } from "react-native";
import { myID, useRealtimeMessages } from "~/hooks/useChat";

export const useMessageNotifier = () => {
  const messages = useRealtimeMessages();
  const previousMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (
      messages.length > previousMessagesLength.current &&
      previousMessagesLength.current > 0 &&
      messages[messages.length - 1].userId !== myID
    ) {
      Vibration.vibrate(400);
    }
    previousMessagesLength.current = messages.length;
  }, [messages]);
};
