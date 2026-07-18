import axios, { type AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import type {
  PatientProfile,
  MedicationAPI,
  PrescriptionAPI,
  OrderAPI,
} from "../types";

export type { MedicationAPI, PrescriptionAPI, OrderAPI };

const TOKEN_KEY = "doz3_patient_token";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

function createClient(): AxiosInstance {
  const client = axios.create({ baseURL: BASE_URL, timeout: 15_000 });

  client.interceptors.request.use(async (cfg) => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
    } catch {}
    return cfg;
  });

  client.interceptors.response.use(undefined, async (err) => {
    const cfg = err.config;
    if (!cfg || cfg._retryCount >= 2) return Promise.reject(err);
    const status = err.response?.status;
    if (status && status < 500) return Promise.reject(err);
    cfg._retryCount = (cfg._retryCount ?? 0) + 1;
    await new Promise((r) => setTimeout(r, 500 * cfg._retryCount));
    return client(cfg);
  });

  return client;
}

export const api = createClient();

// ── Auth ──

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  role: string;
  name: string;
}

export async function loginPatient(phone: string, otp = "123456", name = "") {
  // Field is `phone`, not `phone_number` — the latter 422s. `role` is
  // deliberately not sent: the server reads it from the users table, and any
  // client-supplied role is ignored.
  const { data } = await api.post<LoginResponse>("/auth/login", {
    phone,
    otp,
    name,
  });
  return data;
}

// ── Patient ──

interface PatientAPIResp {
  id: string;
  full_name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  abha_address: string;
}

export async function getOrCreatePatient(p: {
  full_name: string;
  phone_number: string;
  address_line1: string;
  city: string;
  state: string;
  pincode: string;
  abha_address: string;
}): Promise<PatientProfile> {
  const { data } = await api.post<PatientAPIResp>("/patients/", {
    ...p,
    country: "India",
  });
  return {
    id: data.id,
    fullName: data.full_name,
    phone: p.phone_number,
    abhaAddress: data.abha_address,
    addressLine1: data.address_line1,
    addressLine2: data.address_line2 ?? undefined,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    country: data.country,
  };
}

// ── Prescriptions ──

export async function getPatientPrescriptions(patientId: string) {
  const { data } = await api.get<PrescriptionAPI[]>("/prescriptions/", {
    params: { patient_id: patientId },
  });
  return data;
}

// ── Orders ──

export async function getPatientOrders(patientId: string) {
  const { data } = await api.get<OrderAPI[]>(`/patients/${patientId}/orders`);
  return data;
}

export async function getOrderById(orderId: string) {
  const { data } = await api.get<OrderAPI>(`/orders/${orderId}`);
  return data;
}

export async function createOrderFromPrescription(
  prescriptionId: string,
  deliveryAddress: string
) {
  const { data } = await api.post<OrderAPI>(
    `/orders/from-prescription/${prescriptionId}`,
    { delivery_address: deliveryAddress }
  );
  return data;
}

export async function confirmPayment(orderId: string) {
  const { data } = await api.post(`/payments/${orderId}/confirm`, {});
  return data;
}

// ── Medications ──

export async function searchMedications(
  q?: string,
  formFactor?: string,
  limit = 50,
  offset = 0
) {
  const params: Record<string, string | number> = { limit, offset };
  if (q) params.q = q;
  if (formFactor) params.form_factor = formFactor;
  const { data } = await api.get<MedicationAPI[]>("/medications/", { params });
  return data;
}

// ── Fulfillment (dose schedule) ──

export interface FulfillmentLine {
  medication_id: string;
  medication_name: string;
  medication_dosage: string;
  medication_form_factor: string;
  morning: number;
  noon: number;
  night: number;
}

export interface ActiveDoseScheduleResponse {
  patient_id: string;
  abha_address: string;
  window_start: string;
  window_end: string;
  lines: FulfillmentLine[];
}

export async function fetchActiveDoseSchedule(patientId: string) {
  const { data } = await api.get<ActiveDoseScheduleResponse>(
    `/fulfillment/${patientId}/details`
  );
  return data;
}

// ── Health check ──

export async function healthCheck() {
  const { data } = await api.get<{ status: string }>("/health");
  return data;
}
