import { TextInput, View, Text, type TextInputProps } from "react-native";
import { DOZ3 } from "../../constants/Colors";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
}

export function Input({ label, error, leftElement, className = "", style, ...rest }: InputProps) {
  return (
    <View>
      {label && <Text className="text-sm font-semibold text-gray-900 mb-1.5">{label}</Text>}
      <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
        {leftElement && <View className="pl-3">{leftElement}</View>}
        <TextInput
          className={`flex-1 px-4 py-3.5 text-base text-gray-900 ${className}`}
          placeholderTextColor="#9CA3AF"
          selectionColor={DOZ3.primary}
          style={[{ minHeight: 48 }, style]}
          {...rest}
        />
      </View>
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
