import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth";
import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isLoading) return;
    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === "(tabs)";

    if (isAuthenticated && !inAuthGroup) {
      router.replace("/(tabs)/home");
    } else if (!isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, segments, router]);

  if (isLoading) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="doctor-order" options={{ presentation: "card" }} />
        <Stack.Screen name="cart" options={{ presentation: "card" }} />
        <Stack.Screen name="notifications" options={{ presentation: "card" }} />
        <Stack.Screen name="my-id" options={{ presentation: "card" }} />
        <Stack.Screen name="upload-prescription" options={{ presentation: "card" }} />
        <Stack.Screen name="personal-info" options={{ presentation: "card" }} />
        <Stack.Screen name="addresses" options={{ presentation: "card" }} />
        <Stack.Screen name="payment-methods" options={{ presentation: "card" }} />
      </Stack>
    </>
  );
}
