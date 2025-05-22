import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SevaScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Seva Screen</Text>
      </View>
    </SafeAreaView>
  );
} 