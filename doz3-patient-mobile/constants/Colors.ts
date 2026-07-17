export const DOZ3 = {
  primary: "#0F4C81",
  primaryLight: "#1a6bb5",
  primaryBg: "#EFF6FF",
  success: "#10B981",
  successBg: "#F0FDF4",
  warning: "#F97316",
  warningBg: "#FFF7ED",
  danger: "#EF4444",
  dangerBg: "#FEF2F2",
  purple: "#8B5CF6",
  morning: "#F59E0B",
  morningBg: "#FFFBEB",
  afternoon: "#3B82F6",
  afternoonBg: "#EFF6FF",
  night: "#6366F1",
  nightBg: "#EEF2FF",
  text: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  card: "#FFFFFF",
  background: "#F9FAFB",
  white: "#FFFFFF",
};

const tintColorLight = DOZ3.primary;
const tintColorDark = "#E5E7EB";

export default {
  light: {
    text: DOZ3.text,
    background: DOZ3.background,
    tint: tintColorLight,
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
  },
};
