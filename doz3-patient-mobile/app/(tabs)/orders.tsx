import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth";
import { usePatientStore } from "@/store/patient";
import { OrderCard } from "@/components/OrderCard";
import { getPatientOrders } from "@/services/api";

export default function OrdersScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const { orders, ordersLoading, setOrders, setOrdersLoading } = usePatientStore();

  const [tab, setTab] = useState<"active" | "completed">("active");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!patient?.id) return;
    setOrdersLoading(true);
    try {
      const data = await getPatientOrders(patient.id);
      setOrders(data);
    } catch {
      // silent
    } finally {
      setOrdersLoading(false);
    }
  }, [patient?.id, setOrders, setOrdersLoading]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const activeOrders = orders.filter((o) => o.status !== "Delivered");
  const completedOrders = orders.filter((o) => o.status === "Delivered");
  const displayOrders = tab === "active" ? activeOrders : completedOrders;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold text-gray-900">My Orders</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row mx-5 mb-4 bg-gray-100 rounded-xl p-1">
        {(["active", "completed"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className="flex-1 py-2.5 rounded-lg items-center"
            style={{ backgroundColor: tab === t ? "#FFFFFF" : "transparent" }}
          >
            <Text
              className={`text-sm font-semibold ${tab === t ? "text-gray-900" : "text-gray-400"}`}
            >
              {t === "active" ? `Active (${activeOrders.length})` : `Completed (${completedOrders.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={DOZ3.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        {ordersLoading && !refreshing ? (
          <View className="items-center py-16">
            <ActivityIndicator color={DOZ3.primary} />
          </View>
        ) : displayOrders.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons name="receipt-outline" size={56} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">
              {tab === "active" ? "No active orders" : "No completed orders"}
            </Text>
            {tab === "active" && (
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/shop")}
                className="mt-4 px-6 py-3 rounded-xl"
                style={{ backgroundColor: DOZ3.primary }}
              >
                <Text className="text-white font-semibold text-sm">Browse DOZ3 Mart</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="gap-3">
            {displayOrders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                onPress={() =>
                  router.push({ pathname: "/order/[id]", params: { id: o.id } })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
