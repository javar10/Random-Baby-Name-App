import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F0F0F0' },
          contentStyle: { backgroundColor: '#F0F0F0' }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>

    </GestureHandlerRootView>
  )
    ;
}

