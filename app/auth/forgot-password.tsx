import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import { Image } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/auth-context";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const toast = useToast();
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Password reset email sent!</ToastTitle>
            </Toast>
          );
        },
      });
      router.back();
    } catch (error: any) {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>{error.message}</ToastTitle>
            </Toast>
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full px-4" space="md">
      <VStack className="md:items-center" space="md">
        <VStack className="items-center mt-20">
          <Image source={require("@/assets/images/logo.png")} />
          <Heading className="md:text-center" size="3xl">
            Forgot Password
          </Heading>
          <Text>Enter your email to reset your password</Text>
        </VStack>
      </VStack>

      <VStack className="w-full" space="xl">
        <FormControl isInvalid={!!errors?.email} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await forgotPasswordSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  editable={!isLoading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          className="w-full"
          onPress={handleSubmit(onSubmit)}
          isDisabled={isLoading}
        >
          <ButtonText className="font-medium">
            {isLoading ? "Sending..." : "Send Reset Link"}
          </ButtonText>
        </Button>

        <VStack className="items-center" space="sm">
          <Text size="md">Remember your password?</Text>
          <LinkText
            onPress={() => router.back()}
            className="font-medium text-primary-700"
            size="md"
          >
            Back to Sign In
          </LinkText>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ForgotPassword;
