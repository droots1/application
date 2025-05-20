import { Button } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { useLocalization } from "@/i18n/localization-context";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { t, locale, setLocale } = useLocalization();

  const toggleLanguage = () => {
    setLocale(locale === "hi" ? "en" : "hi"); // Toggle between English ('en') and Spanish ('es')
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{t('splash.welcome')}</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={toggleLanguage}>
        <Text> {locale === "en" ? "Switch Hindi" : "Switch to English"}</Text>
      </Button>
      
      <Link href="/auth/signin" asChild>
        <Pressable>
          <Text>Go to Login</Text>
        </Pressable>
      </Link>
    </View>
  );
}
