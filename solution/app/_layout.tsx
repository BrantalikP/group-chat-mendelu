import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "~/theme/theme";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          title: "Chat Room",
          headerTitleStyle: styles.header,
          headerStyle: { backgroundColor: colors.primaryBackground },
        }}
      >
        <Stack.Screen
          name="camera"
          options={{ animation: "fade", headerShown: false }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
  },
});
