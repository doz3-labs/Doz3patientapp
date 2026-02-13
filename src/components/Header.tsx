import React from 'react';
import { Bell, ShoppingCart } from 'lucide-react';
import { NavigationContext } from '../App';

interface HeaderProps {
  navigation: NavigationContext;
}

export function Header({ navigation }: HeaderProps) {
  // Only show minimal header on home page
  const isHome = navigation.currentPage === 'home';

  return (
    <header
      className="bg-white sticky top-0 z-40"
      style={{
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ padding: '12px 16px' }}>
        <div className="flex items-center justify-between">
          {/* Left: DOZ3 Logo + Location */}
          <button
            onClick={() => navigation.navigate('home')}
            className="flex items-center"
            style={{ gap: 12 }}
          >
            <img
              src="./doz3-logo.png"
              alt="DOZ3"
              style={{
                width: 42,
                height: 42,
                objectFit: 'contain',
              }}
            />
            <div>
              <p style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#111827',
                textAlign: 'left',
              }}>
                DOZ3
              </p>
              <p style={{
                fontSize: 12,
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <svg width="12" height="12" fill="#6B7280" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Indiranagar, Bengaluru
              </p>
            </div>
          </button>

          {/* Right: Notification + Cart (larger touch targets) */}
          <div className="flex items-center" style={{ gap: 4 }}>
            <button
              onClick={() => navigation.navigate('notifications')}
              className="relative"
              style={{
                padding: 12,
                borderRadius: 14,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: 48,
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={24} color="#374151" />
              <span style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 18,
                height: 18,
                backgroundColor: '#EF4444',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}>
                4
              </span>
            </button>
            <button
              onClick={() => navigation.navigate('cart')}
              className="relative"
              style={{
                padding: 12,
                borderRadius: 14,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: 48,
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCart size={24} color="#374151" />
              <span style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 18,
                height: 18,
                backgroundColor: '#EF4444',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}>
                2
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
