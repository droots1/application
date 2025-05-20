import { View, Text, Image, ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { useRef } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const bannerImages = [
  require("@/assets/banner/banner1.png"),
  require("@/assets/banner/banner2.png"),
  require("@/assets/banner/banner3.png"),
];

const Home = () => {
  const carouselRef = useRef(null);

  const handleGetStarted = () => {
    router.push("/home");
  };

  const renderItem = ({ item }) => (
    <Image source={item}
    style={{ width: 40, height: 180, borderRadius: 10 }}
    resizeMode="cover"/>
  );

  return (
    <ScrollView className="flex-1 bg-white px-4 py-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Ionicons name="person-circle-outline" size={32} />
        <View className="flex-row space-x-4">
          <Ionicons name="notifications-outline" size={28} />
          <Feather name="search" size={28} />
        </View>
      </View>

      {/* Banner Carousel */}
      {/* <Carousel
        ref={carouselRef}
        data={bannerImages}
        renderItem={renderItem}
        sliderWidth={100}
        itemWidth={ 100}
        loop
        autoplay
      /> */}

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

      {/* Donation Button */}
      <View className="mt-8">
        <Button onPress={handleGetStarted}>
          <ButtonText>Donate Now</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Home;
