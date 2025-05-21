import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { useLocalization } from "@/i18n/localization-context";
import { Link, router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Image } from "react-native";

export default function Index() {
  const { t, locale, setLocale } = useLocalization();

  const handleGetStarted = () => {
    router.push("/auth/signin");
  };


  return (
    <View
    style={{
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    }}
  >
    <VStack className="w-full items-center justify-center h-[80vh]">
      <Image 
      style={{ width: 150, height: 150 }}
      source={require("@/assets/images/logo.png")} />
      <Text className="text-2xl font-bold mt-10">{t('splash.welcome')}</Text>
      <Text className="text-lg text-gray-500 mt-2 text-center">{t('splash.description')}</Text>
    </VStack>
    <Button 
      className="mt-10 w-full" 
      size="lg" 
      variant="solid" 
      action="primary"
      onPress={handleGetStarted}
    >
      <ButtonText>{t('common.getStarted')}</ButtonText>
    </Button>
  </View>
  );
}
