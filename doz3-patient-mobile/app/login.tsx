import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DOZ3 } from "@/constants/Colors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth";
import { loginPatient, getOrCreatePatient } from "@/services/api";

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const resp = await loginPatient(phone, code, "");

      const abhaHandle = phone.slice(-8);
      const patient = await getOrCreatePatient({
        full_name: resp.name || "DOZ3 Patient",
        phone_number: phone,
        address_line1: "Not set",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
        abha_address: `${abhaHandle}@abdm`,
      });

      await login(resp.access_token, patient);
      router.replace("/(tabs)/home");
    } catch (e: any) {
      setError(e?.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text: string, idx: number) => {
    const val = text.replace(/\D/g, "");
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyPress = (key: string, idx: number) => {
    if (key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-16">
          {/* Header */}
          <View className="items-center mb-10">
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center mb-4"
              style={{ backgroundColor: DOZ3.primary }}
            >
              <Text className="text-white text-2xl font-bold">D3</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">Welcome to DOZ3</Text>
            <Text className="text-sm text-gray-500 mt-1">Patient Portal</Text>
          </View>

          {/* Phone step */}
          {step === "phone" && (
            <View className="gap-5">
              <Input
                label="Phone Number"
                placeholder="Enter your 10-digit number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(t) => {
                  setPhone(t.replace(/\D/g, ""));
                  setError("");
                }}
                leftElement={
                  <Text className="text-sm font-medium text-gray-500">+91</Text>
                }
              />

              {error ? <Text className="text-sm text-red-500">{error}</Text> : null}

              <Text className="text-xs text-gray-400">
                We'll send a 6-digit OTP to verify your number
              </Text>

              <Button
                title="Send OTP"
                onPress={handleSendOtp}
                disabled={phone.length < 10}
                size="lg"
              />
            </View>
          )}

          {/* OTP step */}
          {step === "otp" && (
            <View className="gap-5">
              <TouchableOpacity
                onPress={() => { setStep("phone"); setOtp(["","","","","",""]); }}
                className="flex-row items-center gap-1"
              >
                <Ionicons name="arrow-back" size={18} color={DOZ3.textSecondary} />
                <Text className="text-sm text-gray-500">Change number</Text>
              </TouchableOpacity>

              <View>
                <Text className="text-sm font-semibold text-gray-900 mb-1">Enter OTP</Text>
                <Text className="text-xs text-gray-400 mb-4">
                  Sent to +91 {phone.slice(0, 2)}****{phone.slice(-2)}
                </Text>
              </View>

              <View className="flex-row justify-center gap-2">
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(r) => { otpRefs.current[i] = r; }}
                    value={digit}
                    onChangeText={(t) => handleOtpChange(t, i)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50"
                    style={{ color: DOZ3.text }}
                    selectionColor={DOZ3.primary}
                  />
                ))}
              </View>

              {error ? <Text className="text-sm text-red-500 text-center">{error}</Text> : null}

              <Button
                title="Verify & Continue"
                onPress={handleVerifyOtp}
                loading={loading}
                disabled={otp.join("").length !== 6}
                size="lg"
              />

              <TouchableOpacity className="items-center mt-2">
                <Text className="text-sm" style={{ color: DOZ3.primary }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
