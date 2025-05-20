import { Stack } from "expo-router";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Settings } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { useLocalization } from "@/i18n/localization-context";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";


export default function HomeLayout() {
  const router = useRouter();
  const { t } = useLocalization();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack 
       screenOptions={{ headerShown: false }}
      >
         
       </Stack>
    </SafeAreaView>
  );
} 