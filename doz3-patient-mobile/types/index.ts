export interface PatientProfile {
  id: string;
  fullName: string;
  phone: string;
  abhaAddress: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface MedicationAPI {
  id: string;
  name: string;
  dosage: string;
  form_factor: string;
  salt_composition: string | null;
  manufacturer: string | null;
  drug_schedule: string | null;
  requires_prescription: boolean;
  hsn_code: string | null;
  gst_percent: number | null;
  mrp_paise: number | null;
}

export interface DoseScheduleAPI {
  id: string;
  prescription_id: string;
  medication_id: string;
  time_slot: "Morning" | "Noon" | "Night";
  quantity: number;
}

export interface PrescriptionAPI {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  abdm_record_id: string;
  valid_until: string;
  duration_days: number;
  dose_schedules: DoseScheduleAPI[];
}

export type OrderStatus =
  | "PaymentPending"
  | "PendingPharmacistApproval"
  | "ApprovedForPrinting"
  | "PackagingQCCompleted"
  | "Dispatched"
  | "Delivered";

export interface OrderAPI {
  id: string;
  patient_id: string;
  prescription_id: string;
  duration_days: number;
  start_date: string;
  end_date: string;
  delivery_address: string;
  status: OrderStatus;
  created_at: string;
  pouch_roll_id: string | null;
  delivery_id: string | null;
}

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image?: string;
  form_factor?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "order" | "prescription" | "reminder" | "promo";
  read: boolean;
  createdAt: string;
  data?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: string;
  image?: string;
  description?: string;
  inStock: boolean;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PaymentPending: "Payment Pending",
  PendingPharmacistApproval: "Awaiting Pharmacist",
  ApprovedForPrinting: "In Sorting Facility",
  PackagingQCCompleted: "Packaging Complete",
  Dispatched: "Out for Delivery",
  Delivered: "Delivered",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PaymentPending: "#6B7280",
  PendingPharmacistApproval: "#F97316",
  ApprovedForPrinting: "#10B981",
  PackagingQCCompleted: "#8B5CF6",
  Dispatched: "#0F4C81",
  Delivered: "#059669",
};
