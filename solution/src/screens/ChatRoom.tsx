import React, { useRef, useState } from "react";
import { View, FlatList, StyleSheet, Keyboard } from "react-native";
import { colors } from "~/theme/theme";
import { TextBubble } from "~/components/TextBubble";
import { InputField } from "~/components/InputField";
import * as Haptics from "expo-haptics";

import {
  myID,
  myName,
  sendMessageToFirestore,
  useRealtimeMessages,
} from "~/hooks/useChat";
import { useTypingIndicator } from "~/hooks/useTypingIndicator";
import { TypingIndicator } from "~/components/TypingIndicator";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { useMessageNotifier } from "~/hooks/useMessageNotifier";
import { Message } from "~/types";

export const GroupChatScreen = () => {
  useMessageNotifier();
  const [inputText, setInputText] = useState("");
  const messages = useRealtimeMessages();
  const flatListRef = useRef<FlatList<Message>>(null);

  // OPTIONAL
  const { updateTypingStatus, typingUsers } = useTypingIndicator({
    myID,
    myName,
  });

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
