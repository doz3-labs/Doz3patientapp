import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Stethoscope, ShoppingBag, Package, ChevronRight } from 'lucide-react';
import { NavigationContext } from '../../App';
import { MedicineClock } from '../MedicineClock';
import { getGreeting, DESIGN_COLORS } from '../../data/medications';

interface HomePageProps {
  navigation: NavigationContext;
}

export function HomePage({ navigation }: HomePageProps) {
  const greeting = getGreeting();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 24 }}>
      {/* ─── GREETING ─────────────────────────────────── */}
      <div style={{ padding: '20px 16px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 34 }}>{greeting.emoji}</span>
            {greeting.text}, Rajesh
          </h1>
          <p style={{
            fontSize: 15,
            color: '#6B7280',
            marginTop: 4,
            marginLeft: 44,
          }}>
            {greeting.textHindi} · {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </motion.div>
      </div>

      {/* ─── MEDICINE CLOCK (Hero Section) ────────────── */}
      <div style={{ padding: '0 12px' }}>
        <MedicineClock />
      </div>

      {/* ─── DOCTOR ORDER CARD (Real-Time Notification) ─ */}
      <div style={{ padding: '24px 16px 0' }}>
        <motion.button
          onClick={() => navigation.navigate('doctor-order')}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${DESIGN_COLORS.successGreen}, #059669)`,
            borderRadius: 20,
            padding: 20,
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Pulse indicator */}
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 12,
            height: 12,
          }}>
            <span className="animate-ping" style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity: 0.75,
            }} />
            <span style={{
              position: 'relative',
              display: 'block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'white',
            }} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Stethoscope size={28} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 13,
                opacity: 0.9,
                fontFamily: 'Inter, sans-serif',
              }}>
                Dr. Priya Sharma sent a prescription
              </p>
              <p style={{
                fontSize: 18,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                marginTop: 2,
              }}>
                Glimepiride + Metformin + Telmisartan
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 10,
                backgroundColor: 'white',
                color: '#059669',
                padding: '10px 20px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
              }}>
                View & Pay
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* ─── SENIOR-FRIENDLY QUICK ACTIONS ────────────── */}
      <div style={{ padding: '24px 16px 0' }}>
        <h2 style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#111827',
          marginBottom: 14,
          fontFamily: 'Inter, sans-serif',
        }}>
          Quick Actions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Upload Prescription - Large Card */}
          <motion.button
            onClick={() => navigation.navigate('upload-prescription')}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              backgroundColor: 'white',
              border: '2px solid #E5E7EB',
              borderRadius: 20,
              padding: 18,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              minHeight: 80,
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Camera size={28} color={DESIGN_COLORS.doz3Primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 17,
                fontWeight: 600,
                color: '#111827',
                fontFamily: 'Inter, sans-serif',
              }}>
                Upload Prescription
              </div>
              <div style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 2,
                fontFamily: 'Inter, sans-serif',
              }}>
                Take a photo of your prescription
              </div>
            </div>
            <ChevronRight size={22} color="#9CA3AF" />
          </motion.button>

          {/* Shop & Orders side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <motion.button
              onClick={() => navigation.navigate('shop')}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'white',
                border: '2px solid #E5E7EB',
                borderRadius: 20,
                padding: 20,
                cursor: 'pointer',
                minHeight: 100,
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShoppingBag size={26} color={DESIGN_COLORS.successGreen} />
              </div>
              <span style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#111827',
                fontFamily: 'Inter, sans-serif',
              }}>
                Shop
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigation.navigate('orders')}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'white',
                border: '2px solid #E5E7EB',
                borderRadius: 20,
                padding: 20,
                cursor: 'pointer',
                minHeight: 100,
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: '#FFF7ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Package size={26} color="#F97316" />
              </div>
              <span style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#111827',
                fontFamily: 'Inter, sans-serif',
              }}>
                My Orders
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
