import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth";
import { usePatientStore } from "@/store/patient";
import { MedicineClock } from "@/components/MedicineClock";
import { QuickActions } from "@/components/QuickActions";
import { DoctorOrderCard } from "@/components/DoctorOrderCard";
import { fetchActiveDoseSchedule, type FulfillmentLine } from "@/services/api";

interface SlotData {
  key: "morning" | "afternoon" | "night";
  title: string;
  timeRange: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  pills: { name: string; dosage: string }[];
  taken: boolean;
}

function buildSlots(lines: FulfillmentLine[]): SlotData[] {
  const morning: { name: string; dosage: string }[] = [];
  const afternoon: { name: string; dosage: string }[] = [];
  const night: { name: string; dosage: string }[] = [];

  for (const l of lines) {
    if (l.morning > 0) morning.push({ name: l.medication_name, dosage: `${l.morning}x ${l.medication_dosage}` });
    if (l.noon > 0) afternoon.push({ name: l.medication_name, dosage: `${l.noon}x ${l.medication_dosage}` });
    if (l.night > 0) night.push({ name: l.medication_name, dosage: `${l.night}x ${l.medication_dosage}` });
  }

  return [
    { key: "morning", title: "Morning Sachet", timeRange: "6:00 AM - 12:00 PM", icon: "sunny", color: DOZ3.morning, bgColor: DOZ3.morningBg, pills: morning, taken: false },
    { key: "afternoon", title: "Afternoon Sachet", timeRange: "12:00 PM - 6:00 PM", icon: "partly-sunny", color: DOZ3.afternoon, bgColor: DOZ3.afternoonBg, pills: afternoon, taken: false },
    { key: "night", title: "Night Sachet", timeRange: "6:00 PM - 12:00 AM", icon: "moon", color: DOZ3.night, bgColor: DOZ3.nightBg, pills: night, taken: false },
  ];
}

const defaultSlots: SlotData[] = [
  {
    key: "morning", title: "Morning Sachet", timeRange: "6:00 AM - 12:00 PM",
    icon: "sunny", color: DOZ3.morning, bgColor: DOZ3.morningBg, taken: false,
    pills: [{ name: "Amlodipine", dosage: "1x 5mg" }, { name: "Metformin", dosage: "1x 500mg" }],
  },
  {
    key: "afternoon", title: "Afternoon Sachet", timeRange: "12:00 PM - 6:00 PM",
    icon: "partly-sunny", color: DOZ3.afternoon, bgColor: DOZ3.afternoonBg, taken: false,
    pills: [{ name: "Pantoprazole", dosage: "1x 40mg" }],
  },
  {
    key: "night", title: "Night Sachet", timeRange: "6:00 PM - 12:00 AM",
    icon: "moon", color: DOZ3.night, bgColor: DOZ3.nightBg, taken: false,
    pills: [{ name: "Atorvastatin", dosage: "1x 10mg" }, { name: "Metformin", dosage: "1x 500mg" }],
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const prescriptions = usePatientStore((s) => s.prescriptions);
  const unread = usePatientStore((s) => s.unreadCount);

  const [slots, setSlots] = useState<SlotData[]>(defaultSlots);
  const [refreshing, setRefreshing] = useState(false);
  const [hasDoctorOrder, setHasDoctorOrder] = useState(true);

  const fetchData = useCallback(async () => {
    if (!patient?.id) return;
    try {
      const data = await fetchActiveDoseSchedule(patient.id);
      if (data.lines?.length) {
        setSlots(buildSlots(data.lines));
      }
    } catch {
      // use defaults
    }
  }, [patient?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleMarkTaken = (key: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.key === key ? { ...s, taken: true } : s))
    );
  };

  const firstName = patient?.fullName?.split(" ")[0] ?? "Patient";
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={DOZ3.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-gray-500">{greeting},</Text>
            <Text className="text-2xl font-bold text-gray-900">{firstName} 👋</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center"
          >
            <Ionicons name="notifications-outline" size={22} color={DOZ3.text} />
            {unread > 0 && (
              <View className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[9px] font-bold">{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="px-5 gap-5">
          {/* Doctor Order CTA */}
          {hasDoctorOrder && <DoctorOrderCard />}

          {/* Today's Medicine */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-gray-900">Today's Sachets</Text>
              <View className="flex-row items-center gap-1">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-xs text-gray-400">
                  {slots.filter((s) => s.taken).length}/{slots.length} done
                </Text>
              </View>
            </View>
            <MedicineClock slots={slots} onMarkTaken={handleMarkTaken} />
          </View>

          {/* Quick Actions */}
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-3">Quick Actions</Text>
            <QuickActions />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
