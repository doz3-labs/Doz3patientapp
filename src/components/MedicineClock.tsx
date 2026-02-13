import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  TimeSlot,
  Medication,
  TIME_SEGMENTS,
  DEFAULT_MEDICATIONS,
  DESIGN_COLORS,
  getCurrentTimeSlot,
  getMedsForSlot,
} from '../data/medications';
import { useToast } from './Toast';

export function MedicineClock() {
  const { showToast } = useToast();
  const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
  const currentSlot = getCurrentTimeSlot();

  const slotData = useMemo(() => {
    return TIME_SEGMENTS.map(seg => {
      const meds = getMedsForSlot(medications, seg.id);
      const taken = meds.filter(m => m.taken).length;
      return { segment: seg, meds, taken, total: meds.length };
    });
  }, [medications]);

  const markSachetTaken = useCallback((slot: TimeSlot) => {
    setMedications(prev =>
      prev.map(m => m.timeSlot === slot ? { ...m, taken: true } : m)
    );
    const seg = TIME_SEGMENTS.find(s => s.id === slot)!;
    showToast(`${seg.label} sachet marked as taken!`, 'success');
  }, [showToast]);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '12px 0 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {slotData.map(({ segment: seg, meds, taken, total }, idx) => {
          const isCurrent = seg.id === currentSlot;
          const allDone = total > 0 && taken === total;
          const isEmpty = total === 0;

          return (
            <motion.div
              key={seg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              style={{
                backgroundColor: allDone ? '#F0FDF4' : 'white',
                border: `1px solid ${allDone ? '#BBF7D0' : isCurrent ? '#0F4C81' : '#E5E7EB'}`,
                borderRadius: 12,
                padding: '12px 14px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Icon */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: allDone ? '#DCFCE7' : isCurrent ? '#EFF6FF' : '#F9FAFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 20,
                }}>
                  {allDone ? '✅' : seg.icon}
                </div>

                {/* Label + meds */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: allDone ? '#065F46' : '#111827',
                    }}>
                      {seg.label}
                    </span>
                    <span style={{
                      fontSize: 11,
                      color: '#6B7280',
                    }}>
                      {seg.hours}
                    </span>
                    {isCurrent && !allDone && (
                      <span style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'white',
                        backgroundColor: '#0F4C81',
                        padding: '1px 6px',
                        borderRadius: 999,
                        letterSpacing: '0.3px',
                      }}>
                        NOW
                      </span>
                    )}
                  </div>

                  {!isEmpty ? (
                    <div style={{
                      fontSize: 12,
                      color: allDone ? '#047857' : '#6B7280',
                      marginTop: 3,
                      lineHeight: 1.4,
                    }}>
                      {meds.map(m => m.name).join(' + ')}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: 12,
                      color: '#9CA3AF',
                      marginTop: 3,
                    }}>
                      No medicines
                    </div>
                  )}
                </div>

                {/* Taken button */}
                {!isEmpty && (
                  !allDone ? (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => markSachetTaken(seg.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        backgroundColor: '#0F4C81',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Check size={14} strokeWidth={2.5} />
                      Taken
                    </motion.button>
                  ) : (
                    <div style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      backgroundColor: '#DCFCE7',
                      color: '#065F46',
                      fontSize: 12,
                      fontWeight: 600,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <Check size={14} strokeWidth={2.5} />
                      Done
                    </div>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
