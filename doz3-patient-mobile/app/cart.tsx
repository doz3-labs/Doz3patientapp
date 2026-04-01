import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCartStore, useCartTotal, useCartCount } from "@/store/cart";
import { useAuthStore } from "@/store/auth";

export default function CartScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const { items, updateQty, remove, clear } = useCartStore();
  const subtotal = useCartTotal();
  const count = useCartCount();

  const [promo, setPromo] = useState("");
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const delivery = subtotal > 500 ? 0 : 40;
  const discount = promo === "DOZ3FIRST" ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal - discount + delivery;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1500));
    clear();
    setPlacing(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: DOZ3.successBg }}>
            <Ionicons name="checkmark-circle" size={48} color={DOZ3.success} />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</Text>
          <Text className="text-sm text-gray-500 text-center mb-8">
            Your order will be processed and delivered soon.
          </Text>
          <Button title="View My Orders" onPress={() => router.replace("/(tabs)/orders")} size="lg" style={{ width: "100%" }} />
          <Button title="Continue Shopping" onPress={() => router.replace("/(tabs)/shop")} variant="ghost" size="md" style={{ width: "100%", marginTop: 12 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Cart ({count})</Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="cart-outline" size={56} color="#D1D5DB" />
          <Text className="text-gray-400 mt-3 text-base">Your cart is empty</Text>
          <Button
            title="Browse DOZ3 Mart"
            onPress={() => router.push("/(tabs)/shop")}
            variant="outline"
            style={{ marginTop: 20 }}
          />
        </View>
      ) : (
        <>
          <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
            {/* Cart items */}
            <View className="gap-3 mb-5">
              {items.map((item) => (
                <Card key={item.id} className="flex-row items-center p-3">
                  <View className="w-14 h-14 bg-gray-100 rounded-xl items-center justify-center mr-3">
                    <Ionicons name="medical" size={22} color="#D1D5DB" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-xs text-gray-400">{item.brand}</Text>
                    <Text className="text-sm font-bold text-gray-900 mt-1">₹{item.price}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                      onPress={() => updateQty(item.id, -1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center"
                    >
                      <Ionicons name="remove" size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="text-sm font-bold w-6 text-center">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQty(item.id, 1)}
                      className="w-8 h-8 rounded-lg items-center justify-center"
                      style={{ backgroundColor: DOZ3.primary + "15" }}
                    >
                      <Ionicons name="add" size={16} color={DOZ3.primary} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => remove(item.id)} className="ml-2 p-1">
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </Card>
              ))}
            </View>

            {/* Promo */}
            <Card className="flex-row items-center p-3 mb-5">
              <Ionicons name="pricetag" size={18} color={DOZ3.primary} />
              <TextInput
                className="flex-1 ml-2 text-sm"
                placeholder="Enter promo code (try DOZ3FIRST)"
                placeholderTextColor="#9CA3AF"
                value={promo}
                onChangeText={setPromo}
                autoCapitalize="characters"
              />
              {promo.length > 0 && (
                <TouchableOpacity onPress={() => setPromo("")}>
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </Card>

            {/* Price breakdown */}
            <Card className="p-4 mb-5">
              <Text className="text-sm font-bold text-gray-900 mb-3">Price Breakdown</Text>
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500">Subtotal ({count} items)</Text>
                  <Text className="text-sm font-semibold text-gray-900">₹{subtotal}</Text>
                </View>
                {discount > 0 && (
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-500">Discount (DOZ3FIRST)</Text>
                    <Text className="text-sm font-semibold" style={{ color: DOZ3.success }}>-₹{discount}</Text>
                  </View>
                )}
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500">Delivery</Text>
                  <Text className="text-sm font-semibold" style={{ color: delivery === 0 ? DOZ3.success : DOZ3.text }}>
                    {delivery === 0 ? "FREE" : `₹${delivery}`}
                  </Text>
                </View>
                <View className="border-t border-gray-100 pt-2 flex-row justify-between mt-1">
                  <Text className="text-base font-bold text-gray-900">Total</Text>
                  <Text className="text-base font-bold" style={{ color: DOZ3.primary }}>₹{grandTotal}</Text>
                </View>
              </View>
            </Card>

            {/* Delivery Address */}
            <Card className="p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-bold text-gray-900">Deliver to</Text>
                <TouchableOpacity onPress={() => router.push("/addresses")}>
                  <Text className="text-xs font-semibold" style={{ color: DOZ3.primary }}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-600">
                {patient?.addressLine1 ?? "Add delivery address"}
              </Text>
              <Text className="text-xs text-gray-400">
                {patient ? `${patient.city}, ${patient.state} - ${patient.pincode}` : ""}
              </Text>
            </Card>
          </ScrollView>

          {/* Bottom CTA */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pb-8 pt-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm text-gray-500">Total</Text>
              <Text className="text-xl font-bold" style={{ color: DOZ3.primary }}>₹{grandTotal}</Text>
            </View>
            <Button title="Place Order" onPress={handlePlaceOrder} loading={placing} size="lg" style={{ width: "100%" }} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
