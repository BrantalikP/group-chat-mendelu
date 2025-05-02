import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "~/theme/theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IInputField {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
}

export const InputField = ({
  inputText,
  setInputText,
  sendMessage,
}: IInputField) => {
  const openCamera = () => {
    router.navigate("/camera");
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type a message"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        autoCorrect={false}
      />
      <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
        <Ionicons name={"camera"} size={18} color={colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: colors.accentSend,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cameraButton: {
    marginLeft: 10,
    backgroundColor: colors.camera,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 10,
  },
  sendText: {
    color: colors.textPrimary,
    fontWeight: "bold",
  },
});
