import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth";

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string; route: string; color: string }[] = [
  { icon: "id-card", label: "My Health ID", route: "/my-id", color: DOZ3.primary },
  { icon: "person", label: "Personal Info", route: "/personal-info", color: "#6366F1" },
  { icon: "location", label: "Addresses", route: "/addresses", color: DOZ3.success },
  { icon: "card", label: "Payment Methods", route: "/payment-methods", color: DOZ3.warning },
  { icon: "heart", label: "Wishlist", route: "", color: "#EC4899" },
  { icon: "help-circle", label: "Help Center", route: "", color: "#6B7280" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  const initials = (patient?.fullName ?? "D P")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>

          <View className="flex-row items-center gap-4">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: DOZ3.primary }}
            >
              <Text className="text-xl font-bold text-white">{initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{patient?.fullName ?? "DOZ3 Patient"}</Text>
              <Text className="text-sm text-gray-500">{patient?.phone ? `+91 ${patient.phone}` : ""}</Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <Ionicons name="shield-checkmark" size={14} color={DOZ3.success} />
                <Text className="text-xs" style={{ color: DOZ3.success }}>ABHA Verified</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ABHA Card */}
        {patient?.abhaAddress && (
          <View className="mx-5 mb-5 bg-white border border-gray-200 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="ribbon" size={16} color={DOZ3.primary} />
              <Text className="text-xs font-semibold text-gray-500">ABHA Health ID</Text>
            </View>
            <Text className="text-base font-bold text-gray-900">{patient.abhaAddress}</Text>
          </View>
        )}

        {/* Menu Items */}
        <View className="mx-5 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => item.route ? router.push(item.route as any) : null}
              className={`flex-row items-center px-4 py-4 ${i < menuItems.length - 1 ? "border-b border-gray-100" : ""}`}
              activeOpacity={0.7}
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: item.color + "15" }}
              >
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text className="flex-1 text-sm font-medium text-gray-900">{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mx-5 mt-5 flex-row items-center justify-center bg-white border border-red-200 rounded-2xl py-4"
        >
          <Ionicons name="log-out" size={18} color={DOZ3.danger} />
          <Text className="ml-2 text-sm font-semibold" style={{ color: DOZ3.danger }}>
            Logout
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-300 mt-6">DOZ3 v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
