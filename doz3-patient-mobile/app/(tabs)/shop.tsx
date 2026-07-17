import { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { useCartStore, useCartCount } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/constants/Products";
import { searchMedications } from "@/services/api";
import type { MedicationAPI } from "@/types";

type Category = (typeof PRODUCT_CATEGORIES)[number];

export default function ShopScreen() {
  const router = useRouter();
  const cartAdd = useCartStore((s) => s.add);
  const cartCount = useCartCount();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [backendMeds, setBackendMeds] = useState<MedicationAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchMeds = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setBackendMeds([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchMedications(q, undefined, 30, 0);
      setBackendMeds(res);
    } catch {
      setBackendMeds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => fetchMeds(query), 300);
    return () => { if (debounce.current) clearTimeout(debounce.current); };
  }, [query, fetchMeds]);

  const staticFiltered = PRODUCTS.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const medProducts = backendMeds.map((m) => ({
    id: m.id,
    name: m.name,
    brand: m.manufacturer ?? m.salt_composition ?? "Generic",
    price: m.mrp_paise ? Math.round(m.mrp_paise / 100) : 99,
    originalPrice: m.mrp_paise ? Math.round(m.mrp_paise / 80) : 120,
    category: "Medicines" as const,
    inStock: true,
    description: m.salt_composition ?? "",
  }));

  const displayProducts = query.length >= 2 ? [...medProducts, ...staticFiltered] : staticFiltered;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 pt-4 pb-2 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-gray-900">DOZ3 Mart</Text>
        <TouchableOpacity
          onPress={() => router.push("/cart")}
          className="w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center"
        >
          <Ionicons name="cart" size={22} color={DOZ3.text} />
          {cartCount > 0 && (
            <View className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-[9px] font-bold">{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-5 mb-3">
        <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 h-12">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-sm text-gray-900"
            placeholder="Search medicines, health products..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category pills */}
      <View className="h-10 mb-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              className="px-4 h-9 rounded-full items-center justify-center"
              style={{
                backgroundColor: category === cat ? DOZ3.primary : "#F3F4F6",
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: category === cat ? "#FFFFFF" : "#6B7280" }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products */}
      {loading && (
        <View className="items-center py-4">
          <ActivityIndicator color={DOZ3.primary} />
        </View>
      )}

      <FlatList
        data={displayProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            brand={item.brand}
            price={item.price}
            originalPrice={item.originalPrice}
            inStock={item.inStock}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
            onAddToCart={() =>
              cartAdd({
                id: item.id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                originalPrice: item.originalPrice,
              })
            }
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center py-16">
              <Ionicons name="search" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-3">No products found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
