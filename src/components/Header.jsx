import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, ShoppingCart, Wrench, Phone, 
  MapPin, ShieldCheck, Sun, Moon, Car, X, Sparkles
} from 'lucide-react';
import { HELPLINE_PHONE, WHATSAPP_NUMBER, formatPKR } from '../utils/whatsapp';

export default function Header({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  selectedVehicle, 
  onOpenVehicleFinder, 
  onClearVehicle, 
  onSelectProduct,
  products = [],
  darkMode, 
  setDarkMode,
  onOpenCustomPartModal,
  onOpenCargoModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Filter products for autocomplete search
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.oemNumber.toLowerCase().includes(q) ||
          p.make.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }).slice(0, 6);

  // Close search popup when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      {/* Top Utility Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 text-xs py-1.5 px-4 text-slate-300 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-1.5"></span>
              Bilal Ganj Depot Open: 9:00 AM - 9:00 PM PKT
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 mr-1" />
              Circular Road, Bilal Ganj, Lahore
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:flex items-center text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Rating 4.6 / 5.0 (Bilal Ganj Verified Merchant)
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto text-[11px] sm:text-xs">
            <button 
              onClick={onOpenCargoModal}
              className="text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
            >
              📦 Bilty & Cargo Rates
            </button>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20Bilal%20Ganj%20Auto%20Parts!%20I%20have%20an%20inquiry.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <Phone className="w-3 h-3 mr-1 text-emerald-400" />
              <span className="hidden sm:inline">Helpline:</span> {HELPLINE_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform border border-red-500/50">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-lg sm:text-2xl tracking-wider text-white">
                    BILAL GANJ
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600 text-white tracking-widest">
                    LAHORE
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-tight -mt-0.5 hidden xs:block">
                  Genuine • Kabli • Aftermarket Spare Parts
                </p>
              </div>
            </a>
          </div>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden sm:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search by Part Name, OEM No (e.g. 48510), or Car Model..."
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl border border-slate-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#1E293B] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 border-b border-slate-700/60 bg-slate-900/60 text-[11px] font-medium text-slate-400 flex justify-between items-center">
                  <span>Found {searchResults.length} matching auto parts</span>
                  <span className="text-[10px] text-red-400 font-mono">Press Esc to close</span>
                </div>
                <div className="divide-y divide-slate-700/50 max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        setShowSearchResults(false);
                      }}
                      className="p-2.5 hover:bg-slate-700/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-lg border border-slate-700 shrink-0" 
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                              OEM: {item.oemNumber}
                            </span>
                            <span className="text-[10px] text-red-400 font-medium">
                              {item.make} {item.model}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-emerald-400">
                          {formatPKR(item.price)}
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400">
                          {item.condition}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Custom Sourcing Quote Button */}
            <button
              onClick={onOpenCustomPartModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Can't find your car part in catalog? Request Bilal Ganj scrap scout"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Scrap Part Request</span>
            </button>

            {/* Garage Filter Indicator */}
            {selectedVehicle && selectedVehicle.make ? (
              <button 
                onClick={onOpenVehicleFinder}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
                title="Change or reset garage vehicle"
              >
                <Car className="w-3.5 h-3.5" />
                <span className="max-w-[110px] truncate hidden md:inline">
                  {selectedVehicle.make} {selectedVehicle.model}
                </span>
                <span className="md:hidden">Garage</span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearVehicle();
                  }}
                  className="hover:text-red-400 ml-1 font-bold text-sm"
                  title="Remove vehicle filter"
                >
                  ×
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenVehicleFinder}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Car className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Select Vehicle</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title={darkMode ? "Switch to Clean Light Theme (#F8FAFC)" : "Switch to Deep Industrial Dark Theme (#0B0F17)"}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-900/40 border border-red-500/40 transition-transform active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">{formatPKR(cartTotal)}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            placeholder="Search Part Name, OEM No, or Car Model..."
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 text-xs pl-9 pr-8 py-2 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete for Mobile */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#1E293B] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="divide-y divide-slate-700/50 max-h-64 overflow-y-auto">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      setShowSearchResults(false);
                    }}
                    className="p-2.5 hover:bg-slate-700/60 cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">OEM: {item.oemNumber}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-emerald-400">{formatPKR(item.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
