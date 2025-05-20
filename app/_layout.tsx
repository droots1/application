import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import { Button, ButtonText } from "@/components/ui/button";
import { AuthProvider } from "@/contexts/auth-context";
import { LocalizationProvider } from "@/i18n/localization-context";
	
function Example() {
  return (
    <Button size="md" variant="solid" action="primary" >
          <ButtonText>Hello World!</ButtonText>
        </Button>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <LocalizationProvider>
      <AuthProvider>
       <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
      </AuthProvider>
      </LocalizationProvider>
    </GluestackUIProvider>
  );
}