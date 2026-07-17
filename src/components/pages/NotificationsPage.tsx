import React from 'react';
import { NavigationContext } from '../../App';
import { Package, Tag, AlertCircle, CheckCircle, Clock, Stethoscope } from 'lucide-react';

interface NotificationsPageProps {
  navigation: NavigationContext;
}

export function NotificationsPage({ navigation }: NotificationsPageProps) {
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      type: 'payment',
      icon: Stethoscope,
      iconColor: '#10B981',
      title: 'Payment Approved - Dr. Sharma',
      message: 'Your payment of ₹450 for prescribed medicines (Metformin & Telmisartan) has been approved.',
      time: '5 min ago',
      read: false,
      navigateTo: 'orders' as const,
    },
    {
      id: '2',
      type: 'order',
      icon: Package,
      iconColor: '#10B981',
      title: 'Order Out for Delivery',
      message: 'Your order #ORD-2001 is out for delivery and will arrive within 60 minutes.',
      time: '30 min ago',
      read: false,
      navigateTo: 'orders' as const,
    },
    {
      id: '3',
      type: 'promotion',
      icon: Tag,
      iconColor: '#EF4444',
      title: 'Flash Sale Alert!',
      message: 'Flat 50% OFF on all wellness products. Offer valid for next 6 hours only.',
      time: '2 hours ago',
      read: false,
      navigateTo: 'shop' as const,
    },
    {
      id: '4',
      type: 'reminder',
      icon: AlertCircle,
      iconColor: '#0F4C81',
      title: 'Refill Reminder',
      message: 'Your monthly medicine box is due for refill in 3 days. Order now to avoid missing doses.',
      time: '5 hours ago',
      read: false,
      navigateTo: 'cart' as const,
    },
    {
      id: '5',
      type: 'success',
      icon: CheckCircle,
      iconColor: '#10B981',
      title: 'Prescription Approved',
      message: 'Dr. Sharma has approved your prescription. You can now place your order.',
      time: '1 day ago',
      read: true,
      navigateTo: 'doctor-order' as const,
    },
    {
      id: '6',
      type: 'order',
      icon: Package,
      iconColor: '#10B981',
      title: 'Order Delivered',
      message: 'Your order #ORD-1987 has been successfully delivered. Thank you for shopping with DOZ3!',
      time: '2 days ago',
      read: true,
      navigateTo: 'orders' as const,
    },
    {
      id: '7',
      type: 'promotion',
      icon: Tag,
      iconColor: '#EF4444',
      title: 'New Products Available',
      message: 'Check out our new range of Ayurvedic products - Dabur, Himalaya, Patanjali & more.',
      time: '3 days ago',
      read: true,
      navigateTo: 'shop' as const,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    // Navigate to relevant page
    navigation.navigate(notif.navigateTo);
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-[64px] z-30 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-[#EF4444] text-white text-xs rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-2">
        {notifications.map(notification => {
          const Icon = notification.icon;
          return (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-left hover:shadow-md transition-all active:scale-[0.98] ${
                !notification.read ? 'border-l-4 border-l-[#0F4C81]' : ''
              }`}
            >
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${notification.iconColor}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: notification.iconColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-sm pr-2 ${!notification.read ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-[#0F4C81] rounded-full flex-shrink-0 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{notification.message}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mark all as read */}
      {unreadCount > 0 && (
        <div className="px-4 mt-2">
          <button
            onClick={markAllRead}
            className="w-full bg-white border border-[#0F4C81] text-[#0F4C81] py-3 rounded-xl hover:bg-blue-50 transition-colors active:scale-95 text-sm"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}
