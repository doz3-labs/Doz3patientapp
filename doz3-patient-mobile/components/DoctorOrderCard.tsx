import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export function DoctorOrderCard() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/doctor-order")}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={["#10B981", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5"
        style={{ shadowColor: "#10B981", shadowOpacity: 0.3, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}
      >
        <View className="flex-row items-center gap-4">
          <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            <Ionicons name="medical" size={28} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">Your Doctor Prescribed</Text>
            <Text className="text-white/80 text-sm mt-0.5">
              Dr. Priya Sharma sent a prescription
            </Text>
            <Text className="text-white/60 text-xs mt-1">Tap to review & order</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
