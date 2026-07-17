import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className = "", style, ...rest }: CardProps) {
  return (
    <View
      className={`bg-white rounded-2xl border border-gray-200 ${className}`}
      style={[{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
