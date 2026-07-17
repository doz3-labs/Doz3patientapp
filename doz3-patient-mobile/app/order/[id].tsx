import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { StatusTimeline } from "@/components/StatusTimeline";
import { getOrderById } from "@/services/api";
import { STATUS_LABELS, STATUS_COLORS, type OrderAPI } from "@/types";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<OrderAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const o = await getOrderById(id);
        setOrder(o);
      } catch {}
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator color={DOZ3.primary} size="large" />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-8">
        <Ionicons name="alert-circle-outline" size={48} color="#D1D5DB" />
        <Text className="text-gray-400 mt-3">Order not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text style={{ color: DOZ3.primary }} className="font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const label = STATUS_LABELS[order.status] ?? order.status;
  const color = STATUS_COLORS[order.status] ?? "#6B7280";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Order Details</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Status */}
        <Card className="p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-sm font-bold text-gray-900">Order #{order.id.slice(0, 8)}</Text>
              <Text className="text-xs text-gray-400">
                Placed on{" "}
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: color + "20" }}>
              <Text className="text-xs font-semibold" style={{ color }}>
                {label}
              </Text>
            </View>
          </View>

          <StatusTimeline currentStatus={order.status} />
        </Card>

        {/* Order Info */}
        <Card className="p-4 mb-4">
          <Text className="text-sm font-bold text-gray-900 mb-3">Order Info</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">Duration</Text>
              <Text className="text-sm font-semibold text-gray-900">{order.duration_days} days</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">Start Date</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {new Date(order.start_date).toLocaleDateString("en-IN")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-500">End Date</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {new Date(order.end_date).toLocaleDateString("en-IN")}
              </Text>
            </View>
          </View>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="location" size={18} color={DOZ3.primary} />
            <Text className="text-sm font-bold text-gray-900">Delivery Address</Text>
          </View>
          <Text className="text-sm text-gray-600">{order.delivery_address}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
