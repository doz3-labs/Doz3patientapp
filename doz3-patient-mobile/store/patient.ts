import { create } from "zustand";
import type { OrderAPI, PrescriptionAPI, NotificationItem } from "../types";

interface PatientDataState {
  orders: OrderAPI[];
  ordersLoading: boolean;
  prescriptions: PrescriptionAPI[];
  prescriptionsLoading: boolean;
  notifications: NotificationItem[];
  unreadCount: number;

  setOrders: (orders: OrderAPI[]) => void;
  setOrdersLoading: (v: boolean) => void;
  setPrescriptions: (rx: PrescriptionAPI[]) => void;
  setPrescriptionsLoading: (v: boolean) => void;
  addNotification: (n: NotificationItem) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const usePatientStore = create<PatientDataState>((set, get) => ({
  orders: [],
  ordersLoading: false,
  prescriptions: [],
  prescriptionsLoading: false,
  notifications: [
    {
      id: "n1",
      title: "Welcome to DOZ3!",
      body: "Your daily medicine pouches, sorted and delivered.",
      type: "promo",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ],
  unreadCount: 1,

  setOrders: (orders) => set({ orders }),
  setOrdersLoading: (v) => set({ ordersLoading: v }),
  setPrescriptions: (rx) => set({ prescriptions: rx }),
  setPrescriptionsLoading: (v) => set({ prescriptionsLoading: v }),

  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    })),

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));
