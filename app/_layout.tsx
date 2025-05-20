import React from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function TestLayout() {
  return (
    <GluestackUIProvider mode="light">
      <View className="flex-1 bg-background-0">
        <Button variant="solid" className="m-4">
          <Text className="text-typography-0">Test Button</Text>
        </Button>
      </View>
    </GluestackUIProvider>
  );
}