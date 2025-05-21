import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        overScrollMode="always"
        scrollEnabled={true}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Ionicons name="person-circle-outline" size={32} />
          <View className="flex-row space-x-4">
            <Ionicons name="notifications-outline" size={28} />
            <Feather name="search" size={28} />
          </View>
        </View>

        {/* Cards Section */}
        <View className="mt-6">
          <Text className="text-xl font-bold mb-4">Explore</Text>
          <View className="flex-row flex-wrap justify-between gap-4">
            {["Temple", "Seva", "Puja", "Service"].map((label) => (
              <View
                key={label}
                className="bg-orange-100 w-[45%] h-32 rounded-2xl justify-center items-center shadow-md"
              >
                <Text className="text-lg font-semibold">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Add some extra content to test scrolling */}
        <View className="mt-8 space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <View 
              key={index}
              className="bg-gray-100 p-4 rounded-lg"
            >
              <Text className="text-lg">Additional Content {index + 1}</Text>
            </View>
          ))}
        </View>

        {/* Donation Button */}
        <View className="mt-8 mb-8">
          <Button onPress={handleSignOut}>
            <ButtonText>Signup</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
