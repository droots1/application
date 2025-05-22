import { Tabs } from "expo-router";
import { HomeIcon } from "@/assets/icons/home";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useColorScheme } from "react-native";
import { TempleIcon } from "@/assets/icons/temple";
import { SevaIcon } from "@/assets/icons/seva";
import { ServiceIcon } from "@/assets/icons/service";
import { Image } from "react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      initialRouteName="your-temple"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#FF003D",
        tabBarInactiveTintColor: "#6E8D9C",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="temple"
        options={{
          title: "Temple",
          tabBarIcon: ({ color, size }) => (
            <TempleIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="your-temple"
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              className={`w-[60px] h-[60px] 
                rounded-full 
                justify-center
                items-center 
                -mb-10 
                absolute
                bg-white 
                border-2
                ${focused ? "border-primary-300" : "border-transparent"}`}
            >
              <Image
                source={require("@/assets/images/temple.png")}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="seva"
        options={{
          title: "Seva",
          tabBarIcon: ({ color, size }) => (
            <SevaIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Service",
          tabBarIcon: ({ color, size }) => (
            <ServiceIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
} 