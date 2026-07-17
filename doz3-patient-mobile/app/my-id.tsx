import { View, Text, SafeAreaView, TouchableOpacity, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";

export default function MyIdScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My DOZ3 Health ID: ${patient?.abhaAddress ?? "N/A"}\nPatient ID: ${patient?.id ?? "N/A"}`,
      });
    } catch {}
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">My Health ID</Text>
      </View>

      <View className="flex-1 px-5 pt-4">
        {/* QR Card */}
        <Card className="items-center p-6 mb-5">
          <View
            className="w-48 h-48 rounded-2xl items-center justify-center mb-5 border-2"
            style={{ borderColor: DOZ3.primary + "30", backgroundColor: DOZ3.primaryBg }}
          >
            <Ionicons name="qr-code" size={120} color={DOZ3.primary} />
          </View>
          <Text className="text-lg font-bold text-gray-900 mb-1">{patient?.fullName ?? "DOZ3 Patient"}</Text>
          <Text className="text-sm text-gray-500 mb-3">{patient?.abhaAddress ?? ""}</Text>

          <View className="flex-row gap-3 mt-2">
            <Button
              title="Share"
              onPress={handleShare}
              variant="outline"
              size="sm"
              icon={<Ionicons name="share-outline" size={16} color={DOZ3.primary} />}
            />
            <Button
              title="Download"
              onPress={() => {}}
              variant="primary"
              size="sm"
              icon={<Ionicons name="download-outline" size={16} color="white" />}
            />
          </View>
        </Card>

        {/* Profile Summary */}
        <Card className="p-4">
          <Text className="text-sm font-bold text-gray-900 mb-3">Profile Summary</Text>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">Full Name</Text>
              <Text className="text-sm font-semibold text-gray-900">{patient?.fullName}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">Phone</Text>
              <Text className="text-sm font-semibold text-gray-900">{patient?.phone ? `+91 ${patient.phone}` : "-"}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">ABHA Address</Text>
              <Text className="text-sm font-semibold text-gray-900">{patient?.abhaAddress}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">City</Text>
              <Text className="text-sm font-semibold text-gray-900">{patient?.city}</Text>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
