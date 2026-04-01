import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { usePatientStore } from "@/store/patient";
import type { NotificationItem } from "@/types";

const iconMap: Record<NotificationItem["type"], keyof typeof Ionicons.glyphMap> = {
  order: "cube",
  prescription: "medical",
  reminder: "alarm",
  promo: "megaphone",
};

const colorMap: Record<NotificationItem["type"], string> = {
  order: DOZ3.primary,
  prescription: DOZ3.success,
  reminder: DOZ3.warning,
  promo: DOZ3.purple,
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markRead, markAllRead, unreadCount } = usePatientStore();

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const icon = iconMap[item.type] ?? "notifications";
    const color = colorMap[item.type] ?? DOZ3.primary;
    const timeAgo = getTimeAgo(item.createdAt);

    return (
      <TouchableOpacity onPress={() => markRead(item.id)} activeOpacity={0.8}>
        <Card className={`p-4 ${!item.read ? "border-l-4" : ""}`} style={!item.read ? { borderLeftColor: color } : undefined}>
          <View className="flex-row items-start gap-3">
            <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: color + "15" }}>
              <Ionicons name={icon} size={20} color={color} />
            </View>
            <View className="flex-1">
              <Text className={`text-sm ${!item.read ? "font-bold" : "font-medium"} text-gray-900`}>
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">{item.body}</Text>
              <Text className="text-xs text-gray-400 mt-1">{timeAgo}</Text>
            </View>
            {!item.read && <View className="w-2 h-2 rounded-full bg-blue-500 mt-2" />}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text className="text-sm font-semibold" style={{ color: DOZ3.primary }}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Ionicons name="notifications-off-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3">No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
