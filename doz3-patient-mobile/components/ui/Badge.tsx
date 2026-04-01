import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
  color: string;
  bg?: string;
}

export function Badge({ label, color, bg }: BadgeProps) {
  return (
    <View
      className="px-2.5 py-1 rounded-full"
      style={{ backgroundColor: bg ?? color + "20" }}
    >
      <Text className="text-xs font-semibold" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
