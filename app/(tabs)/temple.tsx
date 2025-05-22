import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TempleScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Temple Screen</Text>
      </View>
    </SafeAreaView>
  );
} 