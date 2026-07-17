import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";

const methods = [
  { id: "upi", icon: "phone-portrait" as const, label: "UPI", detail: "Google Pay, PhonePe, Paytm", color: DOZ3.primary },
  { id: "card", icon: "card" as const, label: "Credit/Debit Card", detail: "Visa, Mastercard, RuPay", color: DOZ3.purple },
  { id: "nb", icon: "business" as const, label: "Net Banking", detail: "All major banks", color: DOZ3.success },
  { id: "cod", icon: "cash" as const, label: "Cash on Delivery", detail: "Pay when you receive", color: DOZ3.warning },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Payment Methods</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text className="text-sm text-gray-500 mb-4">
          Supported payment methods for your DOZ3 orders. Payment is mocked in V1.
        </Text>

        <View className="gap-3">
          {methods.map((m) => (
            <Card key={m.id} className="p-4">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-11 h-11 rounded-xl items-center justify-center"
                  style={{ backgroundColor: m.color + "15" }}
                >
                  <Ionicons name={m.icon} size={22} color={m.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-900">{m.label}</Text>
                  <Text className="text-xs text-gray-400">{m.detail}</Text>
                </View>
                <View className="w-5 h-5 rounded-full border-2 border-gray-300" />
              </View>
            </Card>
          ))}
        </View>

        <Card className="p-4 mt-5">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="shield-checkmark" size={16} color={DOZ3.success} />
            <Text className="text-sm font-bold text-gray-900">100% Secure Payments</Text>
          </View>
          <Text className="text-xs text-gray-500">
            All transactions are encrypted and secured. Your payment information is never stored on our servers.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
