import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { colors } from "~/theme/theme";
import { TextBubble } from "~/components/TextBubble";
import { InputField } from "~/components/InputField";
import {
  myID,
  sendMessageToFirestore,
  useRealtimeMessages,
} from "~/hooks/useChat";

export const GroupChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const messages = useRealtimeMessages();

  const sendMessage = () => {
    if (!inputText.trim()) return;
    sendMessageToFirestore({ text: inputText });
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <TextBubble {...item} myId={myID} />}
        contentContainerStyle={styles.messageList}
      />
      <InputField
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.primaryBackground,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginVertical: 12,
  },
  messageList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});
