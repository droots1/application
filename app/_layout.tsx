import { LocalizationProvider } from "@/i18n/localization-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocalizationProvider>
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
    </LocalizationProvider>
  );
}
