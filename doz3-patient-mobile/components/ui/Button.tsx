import { TouchableOpacity, Text, ActivityIndicator, type ViewStyle } from "react-native";
import { DOZ3 } from "../../constants/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "success" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  icon?: React.ReactNode;
}

const bgMap = {
  primary: DOZ3.primary,
  outline: "transparent",
  success: DOZ3.success,
  ghost: "transparent",
};

const textColorMap = {
  primary: "#FFFFFF",
  outline: DOZ3.primary,
  success: "#FFFFFF",
  ghost: DOZ3.primary,
};

const heightMap = { sm: 40, md: 48, lg: 56 };

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  size = "md",
  style,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center rounded-xl ${
        variant === "outline" ? "border-2" : ""
      }`}
      style={[
        {
          backgroundColor: bgMap[variant],
          borderColor: variant === "outline" ? DOZ3.primary : undefined,
          height: heightMap[size],
          paddingHorizontal: 20,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColorMap[variant]} size="small" />
      ) : (
        <>
          {icon}
          <Text
            className={`font-semibold ${size === "lg" ? "text-base" : "text-sm"} ${icon ? "ml-2" : ""}`}
            style={{ color: textColorMap[variant] }}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
