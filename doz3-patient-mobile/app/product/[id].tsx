import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import { PRODUCTS } from "@/constants/Products";
import { useState } from "react";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cartAdd = useCartStore((s) => s.add);

  const product = PRODUCTS.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Ionicons name="alert-circle-outline" size={48} color="#D1D5DB" />
        <Text className="text-gray-400 mt-3">Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text style={{ color: DOZ3.primary }} className="font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    cartAdd({ ...product, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1" numberOfLines={1}>
          Product
        </Text>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <Ionicons name="cart-outline" size={24} color={DOZ3.text} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View className="w-full h-64 bg-white items-center justify-center border-b border-gray-100">
          <Ionicons name="medical" size={72} color="#D1D5DB" />
        </View>

        <View className="px-5 pt-4">
          <Text className="text-xs text-gray-400 mb-1">{product.brand}</Text>
          <Text className="text-xl font-bold text-gray-900 mb-2">{product.name}</Text>

          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-2xl font-bold" style={{ color: DOZ3.primary }}>₹{product.price}</Text>
            <Text className="text-base text-gray-400 line-through">₹{product.originalPrice}</Text>
            {discount > 0 && (
              <View className="px-2 py-0.5 rounded-md" style={{ backgroundColor: DOZ3.successBg }}>
                <Text className="text-xs font-bold" style={{ color: DOZ3.success }}>{discount}% OFF</Text>
              </View>
            )}
          </View>

          {/* Description */}
          {product.description && (
            <Card className="p-4 mb-4">
              <Text className="text-sm font-bold text-gray-900 mb-2">Description</Text>
              <Text className="text-sm text-gray-600 leading-5">{product.description}</Text>
            </Card>
          )}

          {/* Quantity selector */}
          <Card className="p-4 mb-4">
            <Text className="text-sm font-bold text-gray-900 mb-3">Quantity</Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
              >
                <Ionicons name="remove" size={20} color="#6B7280" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-gray-900 w-8 text-center">{qty}</Text>
              <TouchableOpacity
                onPress={() => setQty((q) => q + 1)}
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: DOZ3.primary + "15" }}
              >
                <Ionicons name="add" size={20} color={DOZ3.primary} />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Info */}
          <Card className="p-4">
            <Text className="text-sm font-bold text-gray-900 mb-3">Details</Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Category</Text>
                <Text className="text-sm font-semibold text-gray-900">{product.category}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">In Stock</Text>
                <Text className="text-sm font-semibold" style={{ color: product.inStock ? DOZ3.success : DOZ3.danger }}>
                  {product.inStock ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pb-8 pt-4 flex-row gap-3">
        <Button
          title={added ? "Added!" : "Add to Cart"}
          onPress={handleAdd}
          variant={added ? "success" : "primary"}
          size="lg"
          style={{ flex: 1 }}
          icon={<Ionicons name={added ? "checkmark" : "cart"} size={18} color="white" />}
        />
        <Button
          title="Buy Now"
          onPress={() => {
            handleAdd();
            router.push("/cart");
          }}
          variant="outline"
          size="lg"
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}
