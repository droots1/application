import { View, Text, ScrollView, Dimensions, Pressable, StyleSheet, Platform, Animated, Easing } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRef, useEffect, useCallback, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

const { width } = Dimensions.get('window');

// Using local placeholder images or reliable image URLs
const bannerData = [
  {
    id: 1,
    title: "Special Puja",
    image: "https://picsum.photos/800/400",
    description: "Book your special puja today"
  },
  {
    id: 2,
    title: "Temple Visit",
    image: "https://picsum.photos/800/401",
    description: "Plan your temple visit"
  },
  {
    id: 3,
    title: "Donation",
    image: "https://picsum.photos/800/402",
    description: "Support our temple"
  }
];

const cardData = [
  { id: 1, label: "Temple", icon: "home-outline" as const },
  { id: 2, label: "Seva", icon: "heart-outline" as const },
  { id: 3, label: "Puja", icon: "star-outline" as const },
  { id: 4, label: "Service", icon: "settings-outline" as const }
];

const Home = () => {
  const { signOut, user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToNextBanner = useCallback(() => {
    const nextIndex = (currentBannerIndex + 1) % bannerData.length;
    Animated.timing(scrollX, {
      toValue: nextIndex * (width - 32),
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start(() => {
      setCurrentBannerIndex(nextIndex);
    });
    
    scrollViewRef.current?.scrollTo({
      x: nextIndex * (width - 32),
      animated: false,
    });
  }, [currentBannerIndex, scrollX]);

  useEffect(() => {
    const interval = setInterval(scrollToNextBanner, 4000);

    return () => {
      clearInterval(interval);
      scrollX.stopAnimation();
    };
  }, [scrollToNextBanner, scrollX]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / (width - 32));
        if (index !== currentBannerIndex) {
          setCurrentBannerIndex(index);
        }
      },
    }
  );

  const renderBanner = (banner: typeof bannerData[0], index: number) => {
    const inputRange = [
      (index - 1) * (width - 32),
      index * (width - 32),
      (index + 1) * (width - 32),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-10, 0, 10],
      extrapolate: 'clamp',
    });

    return (
      <View
        key={banner.id}
        style={[styles.bannerContainer, { width: width - 48 }]}
      >
        <Animated.View
          style={{
            transform: [
              { scale },
              { translateX }
            ],
            opacity,
          }}
        >
          <Pressable>
            <Image
              source={{ uri: banner.image }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
              <Text className="text-white text-2xl font-bold">{banner.title}</Text>
              <Text className="text-white text-lg">{banner.description}</Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  const renderCard = (card: typeof cardData[0]) => (
    <Pressable
      key={card.id}
      style={styles.card}
    >
      <View className="bg-gray-100 rounded-full p-2 w-12 h-12 flex items-center justify-center">
        <Ionicons name={card.icon} size={24} color="primary-500" />
      </View>
      <Text className="text-lg font-semibold">{card.label}</Text>
      <Text className="text-md text-gray-500">Tap to explore</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          {/* Header */}
          <View className="flex flex-row justify-between items-center mb-6">
            <Pressable className="flex flex-row items-center gap-2">
              <Image
                source={{ uri: user?.user_metadata?.avatar_url || "https://picsum.photos/200" }}
                className="w-12 h-12 rounded-full"
              />
              <View >
                <Text className="text-lg text-gray-800 font-semibold ">Welcome</Text>
                <Text className="text-sm text-primary-500">{user?.email || 'Guest'}</Text>
              </View>
            </Pressable>
            <View className="flex flex-row gap-2">
              <Pressable className="bg-gray-100 rounded-full p-2">
                <Ionicons name="notifications-outline" size={24} color="#666" />
              </Pressable>
              <Pressable className="bg-gray-100 rounded-full p-2">
                <Feather name="search" size={24} color="#666" />
              </Pressable>
            </View>
          </View>

          {/* Banners Section */}
          <View >
            <Animated.ScrollView 
              ref={scrollViewRef}
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.bannerScroll}
              pagingEnabled
              snapToInterval={width - 32}
              decelerationRate={0.9}
              snapToAlignment="center"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              bounces={false}
            >
              {bannerData.map((banner, index) => renderBanner(banner, index))}
            </Animated.ScrollView>
            <View style={styles.paginationDots}>
              {bannerData.map((_, index) => {
                const inputRange = [
                  (index - 1) * (width - 32),
                  index * (width - 32),
                  (index + 1) * (width - 32),
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [1, 1.5, 1],
                  extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.5, 1, 0.5],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.paginationDot,
                      {
                        transform: [{ scale }],
                        opacity,
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>

          {/* Cards Section */}
          <View className="mt-6">
            <Text className="text-xl font-semibold mb-4">Explore</Text>
            <View className="flex flex-row flex-wrap justify-between">
              {cardData.map(renderCard)}
            </View>
          </View>

          {/* Footer Section */}
          <View className="mt-8 mb-6 bg-gray-100 pt-6 pb-6">
            <View className="flex flex-row items-center justify-center mb-4">
              <Image 
                source={require('@/assets/images/made-in-india.png')} 
                className="w-100 h-20"
                resizeMode="contain"
              />
            </View>
            <View className="items-center">
              <Text className="text-gray-600 text-center font-medium mb-1">
                DROOTS SPIRITUAL FOUNDATION
              </Text>
              <Text className="text-gray-500 text-center text-sm">
                U88900JH2025NPL024769
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
 
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
 
  bannerScroll: {
    marginBottom: 24,
    overflow: 'hidden',
  },
  bannerContainer: {
    marginRight: 16,
    borderRadius: 3,
    overflow: 'hidden',
    width: width,
    backgroundColor: 'transparent',
  },
  
 
  card: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
 
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -18,
    paddingHorizontal: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f97316',
    marginHorizontal: 2,
  },
});

export default Home;
