import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";
import { DOZ3 } from "@/constants/Colors";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#EFF6FF", "#FFFFFF", "#F0FDF4"]} className="flex-1">
      <View className="flex-1 justify-center items-center px-8">
        <View
          className="w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{ backgroundColor: DOZ3.primary }}
        >
          <Text className="text-white text-4xl font-bold">D3</Text>
        </View>

        <Text className="text-3xl font-bold text-gray-900 text-center mb-3">
          DOZ3
        </Text>
        <Text className="text-lg text-gray-500 text-center mb-2">
          Your Daily Medicine, Sorted & Delivered
        </Text>
        <Text className="text-sm text-gray-400 text-center mb-12 px-4">
          Pre-sorted medicine pouches delivered to your door.{"\n"}
          Morning, Afternoon, Night — never miss a dose.
        </Text>

        <View className="w-full gap-3">
          <Button
            title="Get Started"
            onPress={() => router.push("/login")}
            size="lg"
          />
          <Button
            title="I already have an account"
            onPress={() => router.push("/login")}
            variant="outline"
            size="lg"
          />
        </View>
      </View>

      <View className="items-center pb-8">
        <Text className="text-xs text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </LinearGradient>
  );
}
