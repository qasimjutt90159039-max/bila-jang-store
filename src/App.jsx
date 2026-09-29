import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroVehicleFinder from './components/HeroVehicleFinder';
import ActiveGarageBanner from './components/ActiveGarageBanner';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CustomPartModal from './components/CustomPartModal';
import NationwideCargoModal from './components/NationwideCargoModal';
import Footer from './components/Footer';

import { PRODUCTS_DATABASE } from './data/products';
import { WHATSAPP_NUMBER } from './utils/whatsapp';
import { MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Vehicle Finder State (Saved in localStorage)
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    try {
      const saved = localStorage.getItem('bilalganj_vehicle');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cart State (Saved in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bilalganj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomPartModalOpen, setIsCustomPartModalOpen] = useState(false);
  const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bilalganj_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Save vehicle to localStorage
  useEffect(() => {
    try {
      if (selectedVehicle) {
        localStorage.setItem('bilalganj_vehicle', JSON.stringify(selectedVehicle));
      } else {
        localStorage.removeItem('bilalganj_vehicle');
      }
    } catch (e) {
      console.error('Failed to save vehicle', e);
    }
  }, [selectedVehicle]);

  // Sync theme with html root tag
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Add to Cart
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Clear Cart on Order Success
  const handleOrderSuccess = () => {
    setCart([]);
  };

  // Calculate Cart Counts
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_DATABASE];

    // Filter by Selected Vehicle
    if (selectedVehicle && selectedVehicle.make) {
      list = list.filter((p) => {
        const makeMatch = p.make.toLowerCase() === selectedVehicle.make.toLowerCase();
        if (!makeMatch) return false;

        if (selectedVehicle.model && selectedVehicle.model !== 'All Models') {
          const modelMatch =
            p.model.toLowerCase().includes(selectedVehicle.model.toLowerCase()) ||
            selectedVehicle.model.toLowerCase().includes(p.model.toLowerCase()) ||
            (p.compatibleVehicles &&
              p.compatibleVehicles.some((v) =>
                v.toLowerCase().includes(selectedVehicle.model.toLowerCase())
              ));
          if (!modelMatch) return false;
        }

        if (selectedVehicle.year && p.yearRange) {
          const yr = parseInt(selectedVehicle.year, 10);
          if (yr < p.yearRange[0] || yr > p.yearRange[1]) {
            return false;
          }
        }

        return true;
      });
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Condition
    if (selectedCondition !== 'all') {
      list = list.filter((p) => p.condition === selectedCondition);
    }

    // Filter by In-Stock
    if (inStockOnly) {
      list = list.filter((p) => p.stockStatus && p.stockStatus.toLowerCase().includes('in stock'));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedVehicle, selectedCategory, selectedCondition, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. Header with Live Autocomplete, Garage Indicator & Cart */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedVehicle={selectedVehicle}
        onOpenVehicleFinder={() => {
          const heroElem = document.getElementById('vehicle-finder-section');
          if (heroElem) heroElem.scrollIntoView({ behavior: 'smooth' });
        }}
        onClearVehicle={() => setSelectedVehicle(null)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        products={PRODUCTS_DATABASE}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCustomPartModal={() => setIsCustomPartModalOpen(true)}
        onOpenCargoModal={() => setIsCargoModalOpen(true)}
      />

      {/* 2. Interactive Vehicle Part Finder Hero */}
      <div id="vehicle-finder-section">
        <HeroVehicleFinder
          activeVehicle={selectedVehicle}
          onVehicleSelected={(veh) => setSelectedVehicle(veh)}
          onResetVehicle={() => setSelectedVehicle(null)}
          activeCondition={selectedCondition}
          onQuickFilterCondition={(cond) => setSelectedCondition(cond)}
        />
      </div>

      {/* 3. Active Garage Fitment Match Banner */}
      <ActiveGarageBanner
        selectedVehicle={selectedVehicle}
        matchingCount={filteredProducts.length}
        onClear={() => setSelectedVehicle(null)}
        onChangeVehicle={() => {
          const heroElem = document.getElementById('vehicle-finder-section');
          if (heroElem) heroElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Filter Bar (Categories, Conditions, In Stock, Sorting) */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedCondition={selectedCondition}
        onSelectCondition={(cond) => setSelectedCondition(cond)}
        sortBy={sortBy}
        onSelectSort={(sort) => setSortBy(sort)}
        inStockOnly={inStockOnly}
        onToggleInStock={(val) => setInStockOnly(val)}
        totalResults={filteredProducts.length}
      />

      {/* 5. Product Catalog Grid Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        
        {/* Results Counter & Active Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="font-heading text-xl sm:text-2xl font-black text-white tracking-wide">
              {selectedCategory !== 'all' 
                ? selectedCategory.replace('-', ' & ').toUpperCase() 
                : 'AUTOMOTIVE SPARE PARTS CATALOG'}
            </h2>
            <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-slate-700">
              {filteredProducts.length} available
            </span>
          </div>

          {/* Sourcing CTA button */}
          <button
            onClick={() => setIsCustomPartModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/40 hover:bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-500/30 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need unlisted scrap parts? Send Bilal Ganj Request</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedVehicle={selectedVehicle}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700/80 p-8 sm:p-12 text-center max-w-xl mx-auto my-12 space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-lg font-bold text-white">
              No matching parts found in this filter combination
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              We have millions of dismantled parts in Bilal Ganj scrap yards that are not yet inventoried on our website. You can submit a direct scout request or reset your filters.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCondition('all');
                  setSelectedVehicle(null);
                  setInStockOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Reset All Filters
              </button>

              <button
                onClick={() => setIsCustomPartModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Part from Bilal Ganj Scouts</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Support and Quick Contact" className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2 pointer-events-auto">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20Bilal%20Ganj%20Auto%20Parts!%20I%20need%20a%20part%20price%20quote.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-emerald-950/80 border-2 border-emerald-400/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Direct WhatsApp Helpline: +92 301 7928133"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-black text-emerald-100 tracking-wider block -mb-0.5">
              Bilal Ganj Lahore
            </span>
            <span className="text-xs font-bold">
              Chat on WhatsApp
            </span>
          </div>
        </a>
      </aside>

      {/* 6. Footer */}
      <Footer
        onOpenCargoModal={() => setIsCargoModalOpen(true)}
        onOpenCustomPartModal={() => setIsCustomPartModalOpen(true)}
      />

      {/* Modals & Drawers */}
      
      {/* Quick View / Full Spec Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          selectedVehicle={selectedVehicle}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Custom Part Sourcing Modal */}
      <CustomPartModal
        isOpen={isCustomPartModalOpen}
        onClose={() => setIsCustomPartModalOpen(false)}
      />

      {/* Nationwide Bilty Cargo Guide Modal */}
      <NationwideCargoModal
        isOpen={isCargoModalOpen}
        onClose={() => setIsCargoModalOpen(false)}
      />

    </div>
  );
}
