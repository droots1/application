import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useLocalization } from "@/i18n/localization-context";


export default function ProfileLayout() {
  const router = useRouter();
  const { t } = useLocalization();

  return (
    <SafeAreaView>
      <Stack 
       screenOptions={{ headerShown: false }}
      > 
         <Stack.Screen name="/profile" options={{ headerShown: false }} />
       </Stack>
    </SafeAreaView>
  );
} 