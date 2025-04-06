import { View, StyleSheet, Text } from "react-native";
import { colors } from "~/theme/theme";

interface TypingIndicatorProps {
  typingUsers: string[];
}

export const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  if (typingUsers.length === 0) return null;
  return (
    <View style={styles.typingIndicator}>
      <Text style={styles.typingText}>
        {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"}{" "}
        typing...
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  container: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  typingIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  typingText: {
    color: colors.textPrimary,
    fontStyle: "italic",
  },
});
