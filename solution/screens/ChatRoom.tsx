import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, StyleSheet, Keyboard, Vibration } from "react-native";
import { colors } from "~/theme/theme";
import { TextBubble } from "~/components/TextBubble";
import { InputField } from "~/components/InputField";
import * as Haptics from "expo-haptics";

import {
  Message,
  myID,
  myName,
  sendMessageToFirestore,
  useRealtimeMessages,
} from "~/hooks/useChat";
import { useTypingIndicator } from "~/hooks/useTypingIndicator";
import { TypingIndicator } from "~/components/TypingIndicator";
import { KeyboardSpacer } from "../components/KeyboardSpacer";

export const GroupChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const messages = useRealtimeMessages();
  const flatListRef = useRef<FlatList<Message>>(null);
  const previousMessagesLength = useRef(messages.length);

  // OPTIONAL
  const { updateTypingStatus, typingUsers } = useTypingIndicator({
    myID,
    myName,
  });

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
    // OPTIONAL
    updateTypingStatus(false);
  };

  const onChangeText = (text: string) => {
    setInputText(text);
    // OPTIONAL
    updateTypingStatus(text.length > 0);
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
      {/* OPTIONAL */}
      <TypingIndicator typingUsers={typingUsers} />
      <InputField
        inputText={inputText}
        setInputText={onChangeText}
        sendMessage={sendMessage}
      />
      <KeyboardSpacer />
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
