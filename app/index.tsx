import { Text, View } from "react-native";
import BabyName from "./components/BabyName";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BabyName />
    </View>
  );
}
