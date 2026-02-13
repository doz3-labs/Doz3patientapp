import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { MyOrdersPage } from './components/pages/MyOrdersPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { MyIDPage } from './components/pages/MyIDPage';
import { CartPage } from './components/pages/CartPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { DoctorOrderPage } from './components/pages/DoctorOrderPage';
import { UploadPrescriptionPage } from './components/pages/UploadPrescriptionPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { PersonalInfoPage } from './components/pages/PersonalInfoPage';
import { AddressesPage } from './components/pages/AddressesPage';
import { PaymentMethodsPage } from './components/pages/PaymentMethodsPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { HelpCenterPage } from './components/pages/HelpCenterPage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

export type Page = 'home' | 'shop' | 'orders' | 'profile' | 'qr' | 'cart' | 'notifications' | 'doctor-order' | 'upload-prescription' | 'product-detail' | 'personal-info' | 'addresses' | 'payment-methods' | 'wishlist' | 'help-center';

export interface NavigationContext {
  currentPage: Page;
  navigate: (page: Page, data?: any) => void;
  pageData?: any;
}

// Mapping from page names to URL paths
const PAGE_TO_PATH: Record<Page, string> = {
  'home': '/',
  'shop': '/shop',
  'orders': '/orders',
  'profile': '/profile',
  'qr': '/my-id',
  'cart': '/cart',
  'notifications': '/notifications',
  'doctor-order': '/doctor-order',
  'upload-prescription': '/upload-prescription',
  'product-detail': '/product-detail',
  'personal-info': '/personal-info',
  'addresses': '/addresses',
  'payment-methods': '/payment-methods',
  'wishlist': '/wishlist',
  'help-center': '/help-center',
};

// Reverse mapping from paths to page names
const PATH_TO_PAGE: Record<string, Page> = {};
for (const [page, path] of Object.entries(PAGE_TO_PATH)) {
  PATH_TO_PAGE[path] = page as Page;
}

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const currentPage: Page = PATH_TO_PAGE[location.pathname] || 'home';
  const pageData = location.state;

  const navigate = (page: Page, data?: any) => {
    routerNavigate(PAGE_TO_PATH[page], { state: data || null });
    window.scrollTo(0, 0);
  };

  const navigationContext: NavigationContext = {
    currentPage,
    navigate,
    pageData,
  };

  // Determine active tab for bottom nav
  const mainTabs: Page[] = ['home', 'shop', 'qr', 'orders', 'profile'];
  const activeTab = mainTabs.includes(currentPage) ? currentPage : 'home';

  return (
    <div
      className="min-h-screen bg-gray-50 max-w-[430px] mx-auto relative"
      style={{
        fontFamily: 'Inter, sans-serif',
        paddingBottom: 96, // Room for bottom nav
      }}
    >
      {/* Header */}
      <Header navigation={navigationContext} />

      {/* Main Content with page transitions */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage navigation={navigationContext} />} />
              <Route path="/shop" element={<ShopPage navigation={navigationContext} />} />
              <Route path="/orders" element={<MyOrdersPage navigation={navigationContext} />} />
              <Route path="/profile" element={<ProfilePage navigation={navigationContext} />} />
              <Route path="/my-id" element={<MyIDPage navigation={navigationContext} />} />
              <Route path="/cart" element={<CartPage navigation={navigationContext} />} />
              <Route path="/notifications" element={<NotificationsPage navigation={navigationContext} />} />
              <Route path="/doctor-order" element={<DoctorOrderPage navigation={navigationContext} />} />
              <Route path="/upload-prescription" element={<UploadPrescriptionPage navigation={navigationContext} />} />
              <Route path="/product-detail" element={<ProductDetailPage navigation={navigationContext} />} />
              <Route path="/personal-info" element={<PersonalInfoPage navigation={navigationContext} />} />
              <Route path="/addresses" element={<AddressesPage navigation={navigationContext} />} />
              <Route path="/payment-methods" element={<PaymentMethodsPage navigation={navigationContext} />} />
              <Route path="/wishlist" element={<WishlistPage navigation={navigationContext} />} />
              <Route path="/help-center" element={<HelpCenterPage navigation={navigationContext} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={navigate}
      />
    </div>
  );
}
