import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  title: string;
  timeRange: string;
  emoji: string;
  pills: Array<{ name: string; dosage: string }>;
  onPress?: () => void;
};

export function PouchCard({ title, timeRange, emoji, pills, onPress }: Props) {
  return (
    <Animated.View entering={FadeInDown.duration(250)}>
      <Pressable
        onPress={onPress}
        className="rounded-2xl border border-zinc-200 bg-white p-4 active:opacity-90"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-doz3-50">
              <Text className="text-xl">{emoji}</Text>
            </View>
            <View>
              <Text className="text-base font-semibold text-zinc-900">{title}</Text>
              <Text className="text-xs text-zinc-500">{timeRange}</Text>
            </View>
          </View>
          <View className="rounded-full bg-zinc-100 px-2.5 py-1">
            <Text className="text-xs font-semibold text-zinc-700">
              {pills.length} pill{pills.length === 1 ? "" : "s"}
            </Text>
          </View>
        </View>

        <View className="mt-3 gap-2">
          {pills.map((p, idx) => (
            <View
              key={`${p.name}-${p.dosage}-${idx}`}
              className="flex-row items-center justify-between rounded-xl bg-zinc-50 px-3 py-2"
            >
              <Text className="text-sm font-medium text-zinc-900">{p.name}</Text>
              <Text className="text-xs text-zinc-500">{p.dosage}</Text>
            </View>
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

