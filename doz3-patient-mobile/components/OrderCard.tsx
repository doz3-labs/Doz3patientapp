import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { OrderAPI } from "../types";
import { STATUS_LABELS, STATUS_COLORS } from "../types";

interface Props {
  order: OrderAPI;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: Props) {
  const label = STATUS_LABELS[order.status] ?? order.status;
  const color = STATUS_COLORS[order.status] ?? "#6B7280";
  const dateStr = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
              <Ionicons name="cube" size={20} color="#6B7280" />
            </View>
            <View>
              <Text className="text-sm font-semibold text-gray-900">
                Order #{order.id.slice(0, 8)}
              </Text>
              <Text className="text-xs text-gray-400">{dateStr}</Text>
            </View>
          </View>
          <Badge label={label} color={color} />
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs text-gray-500">
            {order.duration_days} day supply
          </Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-xs text-gray-400">View details</Text>
            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
