import React from 'react';
import { Bell, ShoppingCart } from 'lucide-react';
import { NavigationContext } from '../App';
import { getGreeting } from '../data/medications';

interface HeaderProps {
  navigation: NavigationContext;
}

export function Header({ navigation }: HeaderProps) {
  const greeting = getGreeting();

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
          {/* Left: Logo + Greeting */}
          <button
            onClick={() => navigation.navigate('home')}
            className="flex items-center"
            style={{ gap: 12, border: 'none', background: 'none', cursor: 'pointer' }}
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
            <p style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#111827',
              textAlign: 'left',
            }}>
              {greeting.text}, Rajesh
            </p>
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
