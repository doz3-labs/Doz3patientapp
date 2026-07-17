import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "./ui/Card";
import { DOZ3 } from "../constants/Colors";

interface Props {
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  onPress: () => void;
  onAddToCart: () => void;
}

export function ProductCard({ name, brand, price, originalPrice, inStock, onPress, onAddToCart }: Props) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <Card className="flex-1 overflow-hidden">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className="w-full h-28 bg-gray-100 items-center justify-center">
          <Ionicons name="medical" size={36} color="#D1D5DB" />
        </View>
        <View className="p-3">
          <Text className="text-xs text-gray-400 mb-0.5" numberOfLines={1}>{brand}</Text>
          <Text className="text-sm font-semibold text-gray-900 mb-2" numberOfLines={2}>{name}</Text>
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-base font-bold text-gray-900">₹{price}</Text>
            {discount > 0 && (
              <>
                <Text className="text-xs text-gray-400 line-through">₹{originalPrice}</Text>
                <Text className="text-xs font-semibold" style={{ color: DOZ3.success }}>{discount}% off</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View className="px-3 pb-3">
        <TouchableOpacity
          onPress={onAddToCart}
          disabled={!inStock}
          className="h-9 rounded-lg items-center justify-center border"
          style={{
            borderColor: inStock ? DOZ3.primary : "#D1D5DB",
            backgroundColor: inStock ? DOZ3.primary + "08" : "#F3F4F6",
          }}
        >
          <Text
            className="text-sm font-semibold"
            style={{ color: inStock ? DOZ3.primary : "#9CA3AF" }}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
