import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TopAdminBar } from './components/layout/TopAdminBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ProductEditModal } from './components/admin/ProductEditModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { WishlistView } from './views/WishlistView';
import { AdminStudioView } from './views/AdminStudioView';

const MainLayout: React.FC = () => {
  const {
    currentView,
    editingProduct,
    setEditingProduct,
    isAddProductModalOpen,
    setIsAddProductModalOpen
  } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B] selection:bg-[#18181B] selection:text-white">
      {/* Top Admin / Live Editor Bar */}
      <TopAdminBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {(currentView === 'shop' ||
          currentView === 'men' ||
          currentView === 'women' ||
          currentView === 'new-arrivals' ||
          currentView === 'sale' ||
          currentView === 'co-ords') && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-success' && <OrderSuccessView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'admin' && <AdminStudioView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <SearchModal />
      <SizeGuideModal />
      <QuickViewModal />
      <WhatsAppButton />

      {/* Product Edit / Add Modal */}
      {(editingProduct !== null || isAddProductModalOpen) && (
        <ProductEditModal
          product={editingProduct}
          isOpen={editingProduct !== null || isAddProductModalOpen}
          onClose={() => {
            setEditingProduct(null);
            setIsAddProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
