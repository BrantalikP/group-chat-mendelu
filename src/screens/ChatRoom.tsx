import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { colors } from "~/theme/theme";
import { dummyMessages } from "~/mock/messages";
import { TextBubble } from "~/components/TextBubble";
import { InputField } from "~/components/InputField";

export const GroupChatScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: null,
    };
    console.log("Sending message:", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <TextBubble {...item} />}
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
