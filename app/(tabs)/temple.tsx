import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../profile";

export default function TempleScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Temple</Text>
        <Profile />
      </View>
    </SafeAreaView>
  );
} 