import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import fontList from "./constants/fontList";

const loadFonts = async () => {
  await Font.loadAsync(fontList);
};

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

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

