import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack screenOptions={{ title: "Chat Room" }} />
    </SafeAreaView>
  );
}
