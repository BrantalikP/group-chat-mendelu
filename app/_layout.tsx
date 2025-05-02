import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "~/theme/theme";
import { StyleSheet, View } from "react-native";

function RootLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <Stack
        screenOptions={{
          title: "Chat Room",
          headerTitleStyle: styles.header,
          headerStyle: { backgroundColor: colors.primaryBackground },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <RootLayout />
    </SafeAreaProvider>
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
