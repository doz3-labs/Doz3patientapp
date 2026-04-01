import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "../constants/Colors";

const actions = [
  { icon: "qr-code" as const, label: "Scan QR", route: "/my-id", color: DOZ3.primary },
  { icon: "document-text" as const, label: "Upload Rx", route: "/upload-prescription", color: DOZ3.purple },
  { icon: "storefront" as const, label: "DOZ3 Mart", route: "/(tabs)/shop", color: DOZ3.success },
  { icon: "receipt" as const, label: "My Orders", route: "/(tabs)/orders", color: DOZ3.warning },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <View className="flex-row justify-between">
      {actions.map((a) => (
        <TouchableOpacity
          key={a.label}
          onPress={() => router.push(a.route as any)}
          className="items-center flex-1"
          activeOpacity={0.7}
        >
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
            style={{ backgroundColor: a.color + "15" }}
          >
            <Ionicons name={a.icon} size={24} color={a.color} />
          </View>
          <Text className="text-xs font-medium text-gray-600 text-center">{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
