import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "~/theme/theme";

const getUserColor = (name: string) => {
  switch (name) {
    case "Emily":
      return colors.nameEmily;
    case "John":
      return colors.nameJohn;
    case "Lisa":
      return colors.nameLisa;
    case "You":
      return colors.textPrimary;
    default:
      return colors.textPrimary;
  }
};

interface TextBubbleProps {
  item: any;
}

export const TextBubble = ({ item }: TextBubbleProps) => {
  const isCurrentUser = item.user === "You";

  return (
    <View
      style={[
        styles.messageContainer,
        isCurrentUser ? styles.alignRight : styles.alignLeft,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        {!isCurrentUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.user[0]}</Text>
          </View>
        )}
        <View>
          {!isCurrentUser && (
            <Text style={[styles.userName, { color: getUserColor(item.user) }]}>
              {item.user}
            </Text>
          )}
          <View
            style={[
              styles.messageBubble,
              isCurrentUser ? styles.myMessage : styles.otherMessage,
            ]}
          >
            {item.text ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : null}
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            ) : null}
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginBottom: 12,
    flex: 1,
    maxWidth: "55%",
  },
  alignLeft: {
    justifyContent: "flex-start",
  },
  alignRight: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 16,
  },
  myMessage: {
    backgroundColor: colors.bubbleMine,
  },
  otherMessage: {
    backgroundColor: colors.bubbleOther,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  messageText: {
    color: colors.textPrimary,
  },
  messageImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginTop: 6,
  },
  timestamp: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: "right",
  },
});
