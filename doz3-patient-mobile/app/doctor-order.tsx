import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DOZ3 } from "@/constants/Colors";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import {
  getPatientPrescriptions,
  createOrderFromPrescription,
  confirmPayment,
} from "@/services/api";
import type { PrescriptionAPI, DoseScheduleAPI } from "@/types";

export default function DoctorOrderScreen() {
  const router = useRouter();
  const patient = useAuthStore((s) => s.patient);

  const [rx, setRx] = useState<PrescriptionAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchRx = useCallback(async () => {
    if (!patient?.id) return;
    try {
      const rxList = await getPatientPrescriptions(patient.id);
      if (rxList.length > 0) setRx(rxList[0]);
    } catch {}
    setLoading(false);
  }, [patient?.id]);

  useEffect(() => {
    fetchRx();
  }, [fetchRx]);

  const handleConfirmOrder = async () => {
    if (!rx || !patient) return;
    setOrdering(true);
    try {
      const addr = `${patient.addressLine1}, ${patient.city} - ${patient.pincode}`;
      const order = await createOrderFromPrescription(rx.id, addr);
      await confirmPayment(order.id);
      setSuccess(true);
    } catch {
      // alert
    } finally {
      setOrdering(false);
    }
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
            Your prescription order has been sent to the pharmacist for approval.
          </Text>
          <Button
            title="View My Orders"
            onPress={() => {
              router.replace("/(tabs)/orders");
            }}
            size="lg"
            style={{ width: "100%" }}
          />
          <Button
            title="Back to Home"
            onPress={() => router.replace("/(tabs)/home")}
            variant="ghost"
            size="md"
            style={{ width: "100%", marginTop: 12 }}
          />
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
        <Text className="text-xl font-bold text-gray-900">Doctor's Prescription</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={DOZ3.primary} size="large" />
        </View>
      ) : !rx ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="document-text-outline" size={56} color="#D1D5DB" />
          <Text className="text-gray-400 mt-3 text-base text-center">
            No pending prescriptions from your doctor
          </Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="outline"
            style={{ marginTop: 20 }}
          />
        </View>
      ) : (
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {/* Rx Info */}
          <Card className="p-4 mb-4">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
                <Ionicons name="medical" size={20} color={DOZ3.primary} />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">Prescription</Text>
                <Text className="text-xs text-gray-400">
                  Valid until {new Date(rx.valid_until).toLocaleDateString("en-IN")}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between bg-gray-50 rounded-xl p-3">
              <View className="items-center flex-1">
                <Text className="text-xs text-gray-400">Duration</Text>
                <Text className="text-sm font-bold text-gray-900">{rx.duration_days} days</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-xs text-gray-400">Medicines</Text>
                <Text className="text-sm font-bold text-gray-900">{rx.dose_schedules.length}</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-xs text-gray-400">Sachets/day</Text>
                <Text className="text-sm font-bold text-gray-900">3</Text>
              </View>
            </View>
          </Card>

          {/* Dose Schedules */}
          <Text className="text-base font-bold text-gray-900 mb-3">Dose Schedule</Text>
          <View className="gap-2 mb-6">
            {rx.dose_schedules.map((ds: DoseScheduleAPI, i: number) => (
              <Card key={ds.id ?? i} className="flex-row items-center p-3">
                <View
                  className="w-9 h-9 rounded-lg items-center justify-center mr-3"
                  style={{
                    backgroundColor:
                      ds.time_slot === "Morning" ? DOZ3.morningBg
                        : ds.time_slot === "Noon" ? DOZ3.afternoonBg
                        : DOZ3.nightBg,
                  }}
                >
                  <Ionicons
                    name={ds.time_slot === "Morning" ? "sunny" : ds.time_slot === "Noon" ? "partly-sunny" : "moon"}
                    size={18}
                    color={
                      ds.time_slot === "Morning" ? DOZ3.morning
                        : ds.time_slot === "Noon" ? DOZ3.afternoon
                        : DOZ3.night
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-900">
                    {ds.medication_id.slice(0, 8)}...
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {ds.time_slot} · Qty: {ds.quantity}
                  </Text>
                </View>
              </Card>
            ))}
          </View>

          {/* Price */}
          <Card className="p-4 mb-4">
            <Text className="text-sm font-bold text-gray-900 mb-3">Price Breakdown</Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Medicines (estimated)</Text>
                <Text className="text-sm font-semibold text-gray-900">₹{rx.duration_days * 25}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Sorting & Packaging</Text>
                <Text className="text-sm font-semibold text-gray-900">₹{rx.duration_days * 5}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Delivery</Text>
                <Text className="text-sm font-semibold" style={{ color: DOZ3.success }}>FREE</Text>
              </View>
              <View className="border-t border-gray-100 pt-2 flex-row justify-between mt-1">
                <Text className="text-base font-bold text-gray-900">Total</Text>
                <Text className="text-base font-bold" style={{ color: DOZ3.primary }}>
                  ₹{rx.duration_days * 30}
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      )}

      {/* Bottom CTA */}
      {rx && !success && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pb-8 pt-4">
          <Button
            title="Confirm & Pay"
            onPress={handleConfirmOrder}
            loading={ordering}
            size="lg"
            style={{ width: "100%" }}
            icon={<Ionicons name="shield-checkmark" size={18} color="white" />}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
