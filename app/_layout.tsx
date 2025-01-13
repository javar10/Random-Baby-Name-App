import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#31F99A' },
        contentStyle: { backgroundColor: "#DFEFDF" }
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Name My Baby!' }} />
    </Stack>
  )
    ;
}
