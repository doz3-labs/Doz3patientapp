import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "./ui/Card";
import { DOZ3 } from "../constants/Colors";

interface Pill {
  name: string;
  dosage: string;
}

interface SlotData {
  key: "morning" | "afternoon" | "night";
  title: string;
  timeRange: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  pills: Pill[];
  taken: boolean;
}

interface Props {
  slots: SlotData[];
  onMarkTaken: (key: string) => void;
}

function getCurrentSlot(): "morning" | "afternoon" | "night" {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  return "night";
}

export function MedicineClock({ slots, onMarkTaken }: Props) {
  const current = getCurrentSlot();

  return (
    <View className="gap-3">
      {slots.map((slot) => {
        const isCurrent = slot.key === current;
        const isEmpty = slot.pills.length === 0;

        return (
          <Card
            key={slot.key}
            className={`p-4 ${isCurrent && !slot.taken ? "border-2" : ""}`}
            style={
              isCurrent && !slot.taken
                ? { borderColor: DOZ3.primary }
                : slot.taken
                ? { borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }
                : undefined
            }
          >
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: slot.bgColor }}
                >
                  <Ionicons name={slot.icon} size={20} color={slot.color} />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-900">{slot.title}</Text>
                  <Text className="text-xs text-gray-400">{slot.timeRange}</Text>
                </View>
              </View>

              {!isEmpty && !slot.taken && (
                <TouchableOpacity
                  onPress={() => onMarkTaken(slot.key)}
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: DOZ3.success + "15" }}
                >
                  <Text className="text-xs font-semibold" style={{ color: DOZ3.success }}>
                    Mark Taken
                  </Text>
                </TouchableOpacity>
              )}

              {slot.taken && (
                <View className="flex-row items-center gap-1">
                  <Ionicons name="checkmark-circle" size={18} color={DOZ3.success} />
                  <Text className="text-xs font-semibold" style={{ color: DOZ3.success }}>
                    Done
                  </Text>
                </View>
              )}
            </View>

            {!isEmpty && (
              <View className="ml-13 gap-1">
                {slot.pills.map((pill, i) => (
                  <Text key={i} className="text-sm text-gray-600">
                    {pill.name}{" "}
                    <Text className="text-gray-400">{pill.dosage}</Text>
                  </Text>
                ))}
              </View>
            )}

            {isEmpty && (
              <Text className="text-sm text-gray-400 ml-13">No pills in this sachet</Text>
            )}
          </Card>
        );
      })}
    </View>
  );
}
