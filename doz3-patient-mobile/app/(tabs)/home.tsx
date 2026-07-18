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
import {
  fetchDailySchedule,
  markDoseTaken,
  type DailySchedule,
  type TimeSlot,
} from "@/services/api";

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

/** Presentation for each server slot. The server is authoritative on content. */
const SLOT_META: Record<
  TimeSlot,
  Omit<SlotData, "pills" | "taken">
> = {
  Morning: {
    key: "morning", title: "Morning Sachet", timeRange: "6:00 AM - 12:00 PM",
    icon: "sunny", color: DOZ3.morning, bgColor: DOZ3.morningBg,
  },
  Noon: {
    key: "afternoon", title: "Afternoon Sachet", timeRange: "12:00 PM - 6:00 PM",
    icon: "partly-sunny", color: DOZ3.afternoon, bgColor: DOZ3.afternoonBg,
  },
  Night: {
    key: "night", title: "Night Sachet", timeRange: "6:00 PM - 12:00 AM",
    icon: "moon", color: DOZ3.night, bgColor: DOZ3.nightBg,
  },
};

const SLOT_BY_KEY: Record<string, TimeSlot> = {
  morning: "Morning",
  afternoon: "Noon",
  night: "Night",
};

/**
 * Quantities come straight from the server's per-date dose calculation, so a
 * taper shows the step for today and a weekly drug only appears on the day it
 * is due. The old version rendered next month's packing totals, which summed a
 * taper's phases into one number and listed weekly medication every day.
 */
function buildSlots(schedule: DailySchedule): SlotData[] {
  return schedule.slots.map((s) => ({
    ...SLOT_META[s.time_slot],
    pills: s.medications.map((m) => ({
      name: m.medication_name,
      dosage: `${m.quantity}x ${m.medication_dosage}`,
    })),
    taken: s.taken,
  }));
}

/**
 * Shown before the first load and whenever the schedule cannot be fetched.
 *
 * Empty on purpose. This previously fell back to a hardcoded list of real drug
 * names, so a patient who lost connectivity was shown medication that might not
 * be theirs, indistinguishable from the real thing. An empty sachet is honest;
 * an invented one is not.
 */
const EMPTY_SLOTS: SlotData[] = (
  ["Morning", "Noon", "Night"] as TimeSlot[]
).map((s) => ({ ...SLOT_META[s], pills: [], taken: false }));

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function HomeScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const prescriptions = usePatientStore((s) => s.prescriptions);
  const unread = usePatientStore((s) => s.unreadCount);

  const [slots, setSlots] = useState<SlotData[]>(EMPTY_SLOTS);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [hasDoctorOrder, setHasDoctorOrder] = useState(true);

  const fetchData = useCallback(async () => {
    if (!patient?.id) return;
    try {
      const data = await fetchDailySchedule(patient.id);
      setSlots(buildSlots(data));
      setLoadError(false);
    } catch {
      // Show empty sachets and say so, rather than inventing a medication list.
      setSlots(EMPTY_SLOTS);
      setLoadError(true);
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

  const handleMarkTaken = async (key: string) => {
    if (!patient?.id) return;
    const slot = SLOT_BY_KEY[key];
    if (!slot) return;

    // Optimistic: confirming a dose should feel instant. Reverted below if the
    // write fails, so the tick never claims a record the server does not have.
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, taken: true } : s)));
    try {
      await markDoseTaken(patient.id, todayISO(), slot);
    } catch {
      setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, taken: false } : s)));
    }
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
            {loadError && (
              <View className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Text className="text-sm font-medium text-amber-900">
                  Couldn't load today's sachets
                </Text>
                <Text className="mt-0.5 text-xs text-amber-800">
                  Pull down to retry. Don't take anything from memory — check
                  your printed pouch.
                </Text>
              </View>
            )}
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
