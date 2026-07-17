import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DOZ3 } from "../constants/Colors";
import type { OrderStatus } from "../types";

const STEPS: { key: OrderStatus; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "PaymentPending", label: "Order Placed", icon: "receipt" },
  { key: "PendingPharmacistApproval", label: "Pharmacist Review", icon: "shield-checkmark" },
  { key: "ApprovedForPrinting", label: "Sorting Facility", icon: "cog" },
  { key: "PackagingQCCompleted", label: "Packaging Done", icon: "checkmark-done" },
  { key: "Dispatched", label: "Out for Delivery", icon: "car" },
  { key: "Delivered", label: "Delivered", icon: "home" },
];

const ORDER: OrderStatus[] = STEPS.map((s) => s.key);

interface Props {
  currentStatus: OrderStatus;
}

export function StatusTimeline({ currentStatus }: Props) {
  const currentIdx = ORDER.indexOf(currentStatus);

  return (
    <View className="pl-2">
      {STEPS.map((step, i) => {
        const isActive = i <= currentIdx;
        const isCurrent = i === currentIdx;
        const isLast = i === STEPS.length - 1;

        return (
          <View key={step.key} className="flex-row">
            {/* Line + circle */}
            <View className="items-center mr-4" style={{ width: 32 }}>
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isActive ? DOZ3.primary : "#F3F4F6",
                  borderWidth: isCurrent ? 2 : 0,
                  borderColor: isCurrent ? DOZ3.primary + "50" : undefined,
                }}
              >
                <Ionicons
                  name={step.icon}
                  size={16}
                  color={isActive ? "#FFFFFF" : "#9CA3AF"}
                />
              </View>
              {!isLast && (
                <View
                  className="w-0.5 flex-1 my-0.5"
                  style={{
                    backgroundColor: i < currentIdx ? DOZ3.primary : "#E5E7EB",
                    minHeight: 24,
                  }}
                />
              )}
            </View>

            {/* Label */}
            <View className={`pb-5 ${isLast ? "" : ""}`}>
              <Text
                className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}
              >
                {step.label}
              </Text>
              {isCurrent && (
                <Text className="text-xs mt-0.5" style={{ color: DOZ3.primary }}>
                  Current Status
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
