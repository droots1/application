import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function YourTempleScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Your Temple Screen</Text>
      </View>
    </SafeAreaView>
  );
} 