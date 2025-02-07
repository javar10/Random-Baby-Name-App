import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#F0F0F0' },
        contentStyle: { backgroundColor: "#DFEFDF" }
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Name My Baby!' }} />
    </Stack>
  )
    ;
}
