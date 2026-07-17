import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import type { Address } from "@/types";

export default function AddressesScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "a1",
      label: "Home",
      line1: patient?.addressLine1 ?? "42, 1st Cross, Indiranagar",
      city: patient?.city ?? "Bengaluru",
      state: patient?.state ?? "Karnataka",
      pincode: patient?.pincode ?? "560038",
      isDefault: true,
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newLine1, setNewLine1] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const handleAdd = () => {
    if (!newLine1 || !newCity || !newPincode) {
      Alert.alert("Missing fields", "Please fill all required fields");
      return;
    }
    setAddresses((prev) => [
      ...prev,
      {
        id: `a${Date.now()}`,
        label: newLabel || "Other",
        line1: newLine1,
        city: newCity,
        state: "Karnataka",
        pincode: newPincode,
        isDefault: false,
      },
    ]);
    setShowAdd(false);
    setNewLabel("");
    setNewLine1("");
    setNewCity("");
    setNewPincode("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Addresses</Text>
        </View>
        <TouchableOpacity onPress={() => setShowAdd(!showAdd)}>
          <Ionicons name={showAdd ? "close" : "add"} size={24} color={DOZ3.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {addresses.map((addr) => (
          <Card key={addr.id} className="p-4 mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name={addr.label === "Home" ? "home" : addr.label === "Work" ? "briefcase" : "location"}
                  size={18}
                  color={DOZ3.primary}
                />
                <Text className="text-sm font-bold text-gray-900">{addr.label}</Text>
              </View>
              {addr.isDefault && (
                <View className="px-2 py-0.5 bg-blue-50 rounded-full">
                  <Text className="text-xs font-semibold" style={{ color: DOZ3.primary }}>Default</Text>
                </View>
              )}
            </View>
            <Text className="text-sm text-gray-600">{addr.line1}</Text>
            <Text className="text-xs text-gray-400">{addr.city}, {addr.state} - {addr.pincode}</Text>
          </Card>
        ))}

        {showAdd && (
          <Card className="p-5 mt-2">
            <Text className="text-sm font-bold text-gray-900 mb-3">Add New Address</Text>
            <View className="gap-3">
              <Input label="Label" placeholder="Home, Work, etc." value={newLabel} onChangeText={setNewLabel} />
              <Input label="Address Line" placeholder="Street, building, floor" value={newLine1} onChangeText={setNewLine1} />
              <Input label="City" placeholder="City" value={newCity} onChangeText={setNewCity} />
              <Input label="Pincode" placeholder="6-digit" value={newPincode} onChangeText={setNewPincode} keyboardType="number-pad" maxLength={6} />
              <Button title="Add Address" onPress={handleAdd} size="md" />
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
