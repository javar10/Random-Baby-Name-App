import { Text, View } from "react-native";
import Home from "./components/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Home />
      </View>
   

  );
}
