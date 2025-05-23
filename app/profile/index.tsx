import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { EditIcon, Icon, SettingsIcon } from "@/components/ui/icon";
import { ProfileIcon } from "@/assets/icons/profile";
import { SubscriptionIcon } from "@/assets/icons/subscription";
import { LucideIcon } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import React, { useState } from "react";
import { Heading } from "@/components/ui/heading";

type Icons = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
};
const MenuList: Icons[] = [
  {
    iconName: ProfileIcon,
    iconText: "Profile",
  },
  {
    iconName: SettingsIcon,
    iconText: "Address",
  },
  {
    iconName: SubscriptionIcon,
    iconText: "Settings",
  },
  {
    iconName: SubscriptionIcon,
    iconText: "Support",
  },
];

const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // Add any additional logic here if needed
  };

  return (
    <VStack className="h-full w-full mb-16 md:mb-0 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}
      >
        <Box className="relative w-full md:h-[280px] h-[280px] bg-gray-200 py-10 items-center">
          <Avatar size="xl" className="mx-auto">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge size="2xl" />
          </Avatar>
          <VStack className="gap-1 w-full items-center mt-4">
            <Text size="2xl" className="font-roboto text-dark">
              Alexander Leslie
            </Text>
            <Text className="text-md text-typograpphy-700">
              Hanuman Bhakat
            </Text>
          </VStack>

          <Button className="w-[150px] mt-6" size="md" variant="solid" action="secondary">
            <Icon as={EditIcon} size="md" />
            <ButtonText>Edit Profile</ButtonText>
          </Button>
        </Box>
        
       <Box className="w-full px-4 mt-4">
          <Box className="bg-white rounded-xl  border border-gray-200">
            <VStack className="w-full" space="none">
              {MenuList.map((item, index) => (
                <React.Fragment key={index}>
                  <Pressable
                    onPress={() => handlePress(index)}
                    className="flex-row items-center px-4 py-4"
                    style={{
                      borderTopLeftRadius: index === 0 ? 12 : 0,
                      borderTopRightRadius: index === 0 ? 12 : 0,
                      borderBottomLeftRadius: index === MenuList.length - 1 ? 12 : 0,
                      borderBottomRightRadius: index === MenuList.length - 1 ? 12 : 0,
                    }}
                  >
                    <Icon as={item.iconName} className="text-gray-500 mr-4" size="md" />
                    <Text
                      className={`flex-1 text-lg ${
                        index === selectedIndex
                          ? "text-typography-900 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {item.iconText}
                    </Text>
                    
                  </Pressable>
                  {index < MenuList.length - 1 && (
                    <Box className="h-px bg-gray-200 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </VStack>
          </Box>
        </Box>

      </ScrollView>
    </VStack>
  );
}
export default Profile;