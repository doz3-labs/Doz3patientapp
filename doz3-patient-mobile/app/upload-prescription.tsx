import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function UploadPrescriptionScreen() {
  const router = useRouter();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [medicines, setMedicines] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Camera access is required to take a photo");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: DOZ3.successBg }}>
            <Ionicons name="checkmark-circle" size={48} color={DOZ3.success} />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Prescription Uploaded!</Text>
          <Text className="text-sm text-gray-500 text-center mb-8">
            Our pharmacist will review and process your prescription.
          </Text>
          <Button title="Back to Home" onPress={() => router.replace("/(tabs)/home")} size="lg" style={{ width: "100%" }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={DOZ3.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Upload Prescription</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Image upload */}
        <Card className="p-5 mb-5">
          <Text className="text-sm font-bold text-gray-900 mb-3">Prescription Image</Text>
          {imageUri ? (
            <View className="items-center">
              <View className="w-full h-48 bg-gray-100 rounded-xl items-center justify-center mb-3">
                <Ionicons name="document-text" size={48} color={DOZ3.success} />
                <Text className="text-sm text-gray-500 mt-2">Image selected</Text>
              </View>
              <TouchableOpacity onPress={() => setImageUri(null)}>
                <Text className="text-sm" style={{ color: DOZ3.danger }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleCamera}
                className="flex-1 h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl items-center justify-center"
              >
                <Ionicons name="camera" size={28} color={DOZ3.primary} />
                <Text className="text-xs text-gray-500 mt-2">Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePickImage}
                className="flex-1 h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl items-center justify-center"
              >
                <Ionicons name="images" size={28} color={DOZ3.purple} />
                <Text className="text-xs text-gray-500 mt-2">Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Manual entry */}
        <Card className="p-5 mb-5">
          <Text className="text-sm font-bold text-gray-900 mb-3">Or Enter Manually</Text>
          <View className="gap-4">
            <Input label="Patient Name" placeholder="Full name" value={patientName} onChangeText={setPatientName} />
            <View>
              <Text className="text-sm font-semibold text-gray-900 mb-1.5">Medicines</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
                placeholder="e.g., Amlodipine 5mg - 1 morning, Metformin 500mg - 1 morning 1 night"
                placeholderTextColor="#9CA3AF"
                value={medicines}
                onChangeText={setMedicines}
                multiline
                numberOfLines={4}
                style={{ minHeight: 100, textAlignVertical: "top" }}
              />
            </View>
            <Input label="Notes (optional)" placeholder="Any additional instructions" value={notes} onChangeText={setNotes} />
          </View>
        </Card>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pb-8 pt-4">
        <Button
          title="Submit Prescription"
          onPress={handleSubmit}
          loading={submitting}
          disabled={!imageUri && !medicines}
          size="lg"
          style={{ width: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}
