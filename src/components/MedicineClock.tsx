import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Phone, AlertCircle } from 'lucide-react';
import {
  TimeSlot,
  Medication,
  TimeSegment,
  TIME_SEGMENTS,
  DEFAULT_MEDICATIONS,
  DESIGN_COLORS,
  getCurrentTimeSlot,
  getSegment,
  getMedsForSlot,
  shouldAlertCaregiver,
  getGreeting,
} from '../data/medications';
import { useToast } from './Toast';

// ─── SVG ARC HELPER ─────────────────────────────────────
function createArcPath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startDeg: number, endDeg: number
): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180; // -90 offset = 12 o'clock start
  const x1 = cx + outerR * Math.cos(toRad(startDeg));
  const y1 = cy + outerR * Math.sin(toRad(startDeg));
  const x2 = cx + outerR * Math.cos(toRad(endDeg));
  const y2 = cy + outerR * Math.sin(toRad(endDeg));
  const x3 = cx + innerR * Math.cos(toRad(endDeg));
  const y3 = cy + innerR * Math.sin(toRad(endDeg));
  const x4 = cx + innerR * Math.cos(toRad(startDeg));
  const y4 = cy + innerR * Math.sin(toRad(startDeg));
  const large = (endDeg - startDeg) > 180 ? 1 : 0;
  return `M${x1},${y1} A${outerR},${outerR} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 ${large} 0 ${x4},${y4} Z`;
}

// ─── LABEL POSITION HELPER ──────────────────────────────
function getSegmentLabelPos(segment: TimeSegment, cx: number, cy: number, r: number) {
  const midAngle = (segment.startAngle + segment.endAngle) / 2;
  const rad = ((midAngle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// ─── MEDICINE CLOCK COMPONENT ────────────────────────────
export function MedicineClock() {
  const { showToast } = useToast();
  const [activeSlot, setActiveSlot] = useState<TimeSlot>(getCurrentTimeSlot());
  const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
  const [showCaregiverAlert, setShowCaregiverAlert] = useState(false);

  // Check caregiver alert (Grandchild Loop)
  useEffect(() => {
    const check = () => setShowCaregiverAlert(shouldAlertCaregiver(medications));
    check();
    const timer = setInterval(check, 60000); // check every minute
    return () => clearInterval(timer);
  }, [medications]);

  // Get active segment data
  const activeSegment = useMemo(() => getSegment(activeSlot), [activeSlot]);
  const activeMeds = useMemo(() => getMedsForSlot(medications, activeSlot), [medications, activeSlot]);
  const greeting = useMemo(() => getGreeting(), []);

  // Mark medication as taken
  const markTaken = useCallback((medId: string) => {
    setMedications(prev =>
      prev.map(m => m.id === medId ? { ...m, taken: true } : m)
    );
    showToast('Marked as taken! Well done!', 'success');
  }, [showToast]);

  // SVG constants
  const CX = 160, CY = 160, OUTER_R = 138, INNER_R = 82;

  // Count meds per slot
  const medCounts = useMemo(() => {
    const counts: Record<TimeSlot, { total: number; taken: number }> = {
      morning: { total: 0, taken: 0 },
      afternoon: { total: 0, taken: 0 },
      night: { total: 0, taken: 0 },
    };
    medications.forEach(m => {
      counts[m.timeSlot].total++;
      if (m.taken) counts[m.timeSlot].taken++;
    });
    return counts;
  }, [medications]);

  const allActiveTaken = activeMeds.every(m => m.taken);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* ─── DONUT CLOCK ─────────────────────────────── */}
      <div className="flex justify-center" style={{ marginTop: 8 }}>
        <svg
          viewBox="0 0 320 320"
          style={{ width: '100%', maxWidth: 300, height: 'auto' }}
        >
          {/* Background circle (subtle) */}
          <circle cx={CX} cy={CY} r={OUTER_R + 4} fill="none" stroke="#F3F4F6" strokeWidth="2" />

          {/* Donut segments */}
          {TIME_SEGMENTS.map((seg) => {
            const isActive = seg.id === activeSlot;
            const count = medCounts[seg.id];
            const allDone = count.total > 0 && count.taken === count.total;
            const labelPos = getSegmentLabelPos(seg, CX, CY, (OUTER_R + INNER_R) / 2);

            return (
              <g key={seg.id}>
                {/* Segment arc */}
                <motion.path
                  d={createArcPath(CX, CY, OUTER_R, INNER_R, seg.startAngle, seg.endAngle)}
                  fill={allDone ? DESIGN_COLORS.successGreen : seg.color}
                  opacity={isActive ? 1 : 0.35}
                  stroke="white"
                  strokeWidth="3"
                  style={{ cursor: 'pointer', transformOrigin: `${CX}px ${CY}px` }}
                  animate={isActive ? {
                    scale: [1, 1.04, 1],
                    opacity: [1, 0.9, 1],
                  } : { scale: 1 }}
                  transition={isActive ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {}}
                  onClick={() => setActiveSlot(seg.id)}
                  role="button"
                  aria-label={`${seg.label} medicines - ${count.taken} of ${count.total} taken`}
                />

                {/* Segment emoji + count */}
                <text
                  x={labelPos.x}
                  y={labelPos.y - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: 26, cursor: 'pointer', pointerEvents: 'none' }}
                >
                  {allDone ? '✅' : seg.icon}
                </text>
                <text
                  x={labelPos.x}
                  y={labelPos.y + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fill: isActive ? seg.darkColor : '#9CA3AF',
                    pointerEvents: 'none',
                  }}
                >
                  {count.taken}/{count.total}
                </text>
              </g>
            );
          })}

          {/* Center content */}
          <circle cx={CX} cy={CY} r={INNER_R - 4} fill="white" />
          <text
            x={CX} y={CY - 18}
            textAnchor="middle"
            style={{ fontSize: 36 }}
          >
            {greeting.emoji}
          </text>
          <text
            x={CX} y={CY + 10}
            textAnchor="middle"
            style={{ fontSize: 13, fontWeight: 600, fill: '#1F2937', fontFamily: 'Inter, sans-serif' }}
          >
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </text>
          <text
            x={CX} y={CY + 28}
            textAnchor="middle"
            style={{ fontSize: 10, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
          >
            {activeSegment.hours}
          </text>
        </svg>
      </div>

      {/* ─── SEGMENT SELECTOR PILLS ──────────────────── */}
      <div className="flex justify-center gap-2" style={{ marginTop: 12 }}>
        {TIME_SEGMENTS.map((seg) => {
          const isActive = seg.id === activeSlot;
          const count = medCounts[seg.id];
          const allDone = count.total > 0 && count.taken === count.total;
          return (
            <motion.button
              key={seg.id}
              onClick={() => setActiveSlot(seg.id)}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 999,
                border: `2px solid ${isActive ? (allDone ? DESIGN_COLORS.successGreen : seg.color) : '#E5E7EB'}`,
                backgroundColor: isActive ? (allDone ? '#ECFDF5' : seg.lightColor) : 'white',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? seg.darkColor : '#6B7280',
                cursor: 'pointer',
                minHeight: 44, // Touch target for seniors
              }}
            >
              <span style={{ fontSize: 18 }}>{allDone ? '✅' : seg.icon}</span>
              {seg.label}
            </motion.button>
          );
        })}
      </div>

      {/* ─── ACTIVE SEGMENT HEADING ──────────────────── */}
      <motion.div
        key={activeSlot}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: 24, paddingLeft: 4, paddingRight: 4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#111827',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 28 }}>{activeSegment.icon}</span>
              {activeSegment.label} Medicines
            </h2>
            <p style={{
              fontSize: 14,
              color: '#6B7280',
              marginTop: 2,
              fontFamily: 'Inter, sans-serif',
            }}>
              {activeMeds.filter(m => m.taken).length} of {activeMeds.length} taken
            </p>
          </div>
          {allActiveTaken && activeMeds.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                backgroundColor: DESIGN_COLORS.successGreen,
                color: 'white',
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Check size={18} /> All Done!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ─── MEDICATION CARDS ────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlot}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {activeMeds.map((med, idx) => (
            <MedicationCard
              key={med.id}
              medication={med}
              segment={activeSegment}
              onMarkTaken={markTaken}
              index={idx}
            />
          ))}

          {activeMeds.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 32,
              color: '#9CA3AF',
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
            }}>
              <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>
                {activeSegment.icon}
              </span>
              No medicines for {activeSegment.label.toLowerCase()}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ─── CAREGIVER ALERT (Grandchild Loop) ───────── */}
      <AnimatePresence>
        {showCaregiverAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              marginTop: 20,
              backgroundColor: '#FFF7ED',
              border: '2px solid #FDBA74',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#FED7AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Phone size={24} color="#EA580C" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#9A3412',
                fontFamily: 'Inter, sans-serif',
              }}>
                Caregiver will be notified
              </p>
              <p style={{
                fontSize: 13,
                color: '#C2410C',
                marginTop: 2,
                fontFamily: 'Inter, sans-serif',
              }}>
                Take your morning medicines to stay healthy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── INDIVIDUAL MEDICATION CARD ──────────────────────────
interface MedicationCardProps {
  medication: Medication;
  segment: TimeSegment;
  onMarkTaken: (id: string) => void;
  index: number;
}

function MedicationCard({ medication, segment, onMarkTaken, index }: MedicationCardProps) {
  const isTaken = medication.taken;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        backgroundColor: isTaken ? '#ECFDF5' : 'white',
        border: `2px solid ${isTaken ? DESIGN_COLORS.successGreen : '#E5E7EB'}`,
        borderRadius: 20,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transition: 'all 0.3s ease',
        boxShadow: isTaken ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Large pill visual */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: isTaken ? '#D1FAE5' : segment.lightColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 32,
        border: `2px solid ${isTaken ? '#A7F3D0' : segment.color + '40'}`,
      }}>
        {isTaken ? '✅' : medication.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: isTaken ? '#065F46' : '#111827',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.2,
        }}>
          {medication.name}
        </div>
        <div style={{
          fontSize: 14,
          color: isTaken ? '#047857' : '#6B7280',
          fontFamily: 'Inter, sans-serif',
          marginTop: 2,
        }}>
          {medication.dosage} · {medication.form}
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 6,
          padding: '2px 10px',
          borderRadius: 999,
          backgroundColor: isTaken ? '#D1FAE5' : segment.lightColor,
          fontSize: 12,
          fontWeight: 500,
          color: isTaken ? '#047857' : segment.darkColor,
          fontFamily: 'Inter, sans-serif',
        }}>
          {medication.purpose}
        </div>
      </div>

      {/* TAKEN button - big, accessible */}
      {!isTaken ? (
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onMarkTaken(medication.id)}
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: DESIGN_COLORS.successGreen,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
          }}
        >
          <Check size={28} strokeWidth={3} />
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.5px',
          }}>
            TAKEN
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: '#D1FAE5',
            border: `2px solid ${DESIGN_COLORS.successGreen}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 28 }}>✅</span>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#065F46',
            fontFamily: 'Inter, sans-serif',
          }}>
            DONE
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
