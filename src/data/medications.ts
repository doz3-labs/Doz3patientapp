// DOZ3 Patient App - Medication Schedule Data
// Designed for semi-literate seniors in India (60+)
// Uses visual-first approach: emojis, colors, minimal text

export type TimeSlot = 'morning' | 'afternoon' | 'night';

export interface Medication {
  id: string;
  name: string;
  nameHindi: string; // Bilingual support for Indian seniors
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'drop';
  timeSlot: TimeSlot;
  taken: boolean;
  emoji: string;
  pillColor: string;
  purpose: string; // Simple one-word purpose
  doctorName: string;
}

export interface TimeSegment {
  id: TimeSlot;
  label: string;
  labelHindi: string;
  icon: string;
  color: string;
  lightColor: string;
  darkColor: string;
  startAngle: number;
  endAngle: number;
  hours: string;
}

// Design System Colors from guidelines
export const DESIGN_COLORS = {
  successGreen: '#10B981',
  morningYellow: '#FACC15',    // Yellow-400
  afternoonOrange: '#F97316',  // Orange-500
  nightBlue: '#2563EB',        // Blue-600
  doz3Primary: '#0F4C81',
  dangerRed: '#EF4444',
} as const;

// Time segments for the donut clock
export const TIME_SEGMENTS: TimeSegment[] = [
  {
    id: 'morning',
    label: 'Morning',
    labelHindi: 'सुबह',
    icon: '🌅',
    color: '#FACC15',      // Yellow-400
    lightColor: '#FEF9C3',  // Yellow-50
    darkColor: '#A16207',   // Yellow-800
    startAngle: 0,
    endAngle: 118,
    hours: '6 AM – 12 PM',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    labelHindi: 'दोपहर',
    icon: '☀️',
    color: '#F97316',       // Orange-500
    lightColor: '#FFF7ED',  // Orange-50
    darkColor: '#9A3412',   // Orange-800
    startAngle: 120,
    endAngle: 238,
    hours: '12 PM – 6 PM',
  },
  {
    id: 'night',
    label: 'Night',
    labelHindi: 'रात',
    icon: '🌙',
    color: '#2563EB',       // Blue-600
    lightColor: '#EFF6FF',  // Blue-50
    darkColor: '#1E3A5F',   // Blue-900
    startAngle: 240,
    endAngle: 358,
    hours: '6 PM – 6 AM',
  },
];

// Rajesh Kumar's actual medication schedule
// Synced from Doctor Dashboard (Dr. Priya Sharma's prescriptions)
// Active Meds: Glimepiride 1mg (1-0-0), Metformin 500mg (1-0-1), Telmisartan 40mg (1-0-0)
export const DEFAULT_MEDICATIONS: Medication[] = [
  // ─── Morning medications (before breakfast) ───
  {
    id: 'med-1',
    name: 'Glimepiride',
    nameHindi: 'ग्लिमेपिराइड',
    dosage: '1 mg',
    form: 'tablet',
    timeSlot: 'morning',
    taken: false,
    emoji: '💊',
    pillColor: '#FCA5A5',
    purpose: 'Diabetes',
    doctorName: 'Dr. Priya Sharma',
  },
  {
    id: 'med-2',
    name: 'Metformin',
    nameHindi: 'मेटफॉर्मिन',
    dosage: '500 mg',
    form: 'tablet',
    timeSlot: 'morning',
    taken: false,
    emoji: '💊',
    pillColor: '#FFFFFF',
    purpose: 'Diabetes',
    doctorName: 'Dr. Priya Sharma',
  },
  {
    id: 'med-3',
    name: 'Telmisartan',
    nameHindi: 'टेल्मिसार्टन',
    dosage: '40 mg',
    form: 'tablet',
    timeSlot: 'morning',
    taken: false,
    emoji: '💊',
    pillColor: '#FDE68A',
    purpose: 'BP',
    doctorName: 'Dr. Priya Sharma',
  },
  // ─── Night medications (after dinner) ───
  {
    id: 'med-4',
    name: 'Metformin',
    nameHindi: 'मेटफॉर्मिन',
    dosage: '500 mg',
    form: 'tablet',
    timeSlot: 'night',
    taken: false,
    emoji: '💊',
    pillColor: '#FFFFFF',
    purpose: 'Diabetes',
    doctorName: 'Dr. Priya Sharma',
  },
];

// Helper: get current time slot
export function getCurrentTimeSlot(): TimeSlot {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
}

// Helper: get segment for a time slot
export function getSegment(slot: TimeSlot): TimeSegment {
  return TIME_SEGMENTS.find(s => s.id === slot)!;
}

// Helper: get medications for a time slot
export function getMedsForSlot(meds: Medication[], slot: TimeSlot): Medication[] {
  return meds.filter(m => m.timeSlot === slot);
}

// Helper: check if caregiver alert should fire (Grandchild Loop)
export function shouldAlertCaregiver(meds: Medication[]): boolean {
  const hour = new Date().getHours();
  // If it's past 11 AM and morning meds not taken
  if (hour >= 11 && hour < 14) {
    const morningMeds = getMedsForSlot(meds, 'morning');
    return morningMeds.some(m => !m.taken);
  }
  return false;
}

// Helper: get greeting based on time
export function getGreeting(): { text: string; textHindi: string; emoji: string } {
  const slot = getCurrentTimeSlot();
  switch (slot) {
    case 'morning':
      return { text: 'Good Morning', textHindi: 'सुप्रभात', emoji: '🌅' };
    case 'afternoon':
      return { text: 'Good Afternoon', textHindi: 'नमस्ते', emoji: '☀️' };
    case 'night':
      return { text: 'Good Evening', textHindi: 'शुभ संध्या', emoji: '🌙' };
  }
}
