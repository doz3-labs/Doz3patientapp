import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, QrCode, Package, User } from 'lucide-react';
import { Page } from '../App';
import { DESIGN_COLORS } from '../data/medications';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'shop' as Page, label: 'Shop', icon: ShoppingBag },
    { id: 'qr' as Page, label: 'My ID', icon: QrCode, isCenter: true },
    { id: 'orders' as Page, label: 'Orders', icon: Package },
    { id: 'profile' as Page, label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Soft shadow above nav */}
      <div style={{
        height: 8,
        background: 'linear-gradient(to top, rgba(0,0,0,0.04), transparent)',
      }} />

      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 6,
        paddingBottom: 10,
        paddingLeft: 4,
        paddingRight: 4,
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // Center floating button (My ID)
          if (item.isCenter) {
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: -28,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
              >
                <div style={{
                  width: 62,
                  height: 62,
                  backgroundColor: DESIGN_COLORS.doz3Primary,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(15, 76, 129, 0.3)',
                }}>
                  <Icon size={28} color="white" />
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: DESIGN_COLORS.doz3Primary,
                  marginTop: 4,
                }}>
                  {item.label}
                </span>
              </motion.button>
            );
          }

          // Regular nav items - larger touch targets
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.9 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                padding: '8px 12px',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? `${DESIGN_COLORS.doz3Primary}10` : 'transparent',
                minWidth: 60,
                minHeight: 52, // Minimum touch target for seniors
              }}
            >
              <Icon
                size={24}
                color={isActive ? DESIGN_COLORS.doz3Primary : '#9CA3AF'}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span style={{
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? DESIGN_COLORS.doz3Primary : '#9CA3AF',
              }}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: DESIGN_COLORS.doz3Primary,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
