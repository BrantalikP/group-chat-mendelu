import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, StyleSheet, Keyboard, Vibration } from "react-native";
import { colors } from "~/theme/theme";
import { TextBubble } from "~/components/TextBubble";
import { InputField } from "~/components/InputField";
import * as Haptics from "expo-haptics";

import {
  Message,
  myID,
  sendMessageToFirestore,
  useRealtimeMessages,
} from "~/hooks/useChat";
import { useKeyboardHeight } from "~/hooks/useKeyboardHeight";
import Animated from "react-native-reanimated";

export const GroupChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const messages = useRealtimeMessages();
  const flatListRef = useRef<FlatList<Message>>(null);
  const { keyboardHeight } = useKeyboardHeight();
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

  const sendMessage = () => {
    if (!inputText.trim()) return;
    sendMessageToFirestore({ text: inputText });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setInputText("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList<Message>
        data={messages}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <TextBubble {...item} myId={myID} />}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <InputField
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
      />
      <Animated.View style={keyboardHeight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  messageList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});
