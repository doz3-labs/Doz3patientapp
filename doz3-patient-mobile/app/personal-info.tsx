import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [name, setName] = useState(patient?.fullName ?? "");
  const [phone] = useState(patient?.phone ?? "");
  const [city, setCity] = useState(patient?.city ?? "");
  const [pincode, setPincode] = useState(patient?.pincode ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateProfile({ fullName: name, city, pincode });
    setSaving(false);
    Alert.alert("Updated", "Your profile has been updated.");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Personal Info</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Card className="p-5 mt-2">
          <View className="gap-4">
            <Input label="Full Name" value={name} onChangeText={setName} placeholder="Enter your name" />
            <Input label="Phone Number" value={`+91 ${phone}`} editable={false} />
            <Input label="ABHA Address" value={patient?.abhaAddress ?? ""} editable={false} />
            <Input label="City" value={city} onChangeText={setCity} placeholder="Your city" />
            <Input label="Pincode" value={pincode} onChangeText={setPincode} placeholder="6-digit pincode" keyboardType="number-pad" maxLength={6} />
          </View>
        </Card>

        <Button
          title="Save Changes"
          onPress={handleSave}
          loading={saving}
          size="lg"
          style={{ marginTop: 20, width: "100%" }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
