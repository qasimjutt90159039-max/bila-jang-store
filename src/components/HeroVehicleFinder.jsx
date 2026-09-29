import React, { useState } from 'react';
import { 
  Car, Search, CheckCircle2, Zap, Truck, 
  RotateCcw, ArrowRight
} from 'lucide-react';
import { CAR_VEHICLES_DATABASE } from '../data/products';

export default function HeroVehicleFinder({ 
  onVehicleSelected, 
  activeVehicle, 
  onQuickFilterCondition,
  activeCondition,
  onResetVehicle
}) {
  const [selectedMake, setSelectedMake] = useState(activeVehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState(activeVehicle?.model || '');
  const [selectedYear, setSelectedYear] = useState(activeVehicle?.year || '');

  // Makes list from database
  const availableMakes = Object.keys(CAR_VEHICLES_DATABASE);

  // Available models based on selected make
  const availableModels = selectedMake && CAR_VEHICLES_DATABASE[selectedMake]
    ? CAR_VEHICLES_DATABASE[selectedMake].models
    : [];

  // Available years based on selected model
  const activeModelObj = availableModels.find(m => m.name === selectedModel);
  const availableYears = activeModelObj ? activeModelObj.years : [];

  const handleMakeChange = (e) => {
    const make = e.target.value;
    setSelectedMake(make);
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setSelectedYear('');
  };

  const handleFindParts = (e) => {
    e.preventDefault();
    if (!selectedMake) return;
    onVehicleSelected({
      make: selectedMake,
      model: selectedModel || 'All Models',
      year: selectedYear || null
    });

    // Smooth scroll down to catalog
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedYear('');
    onResetVehicle();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#111827] to-[#0B0F17] pt-8 pb-12 border-b border-slate-800">
      
      {/* Background Industrial Grid & Glow Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Top Title & Trust Pill */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/70 border border-red-800/40 text-red-300 text-xs font-semibold mb-4 backdrop-blur-sm shadow-inner">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Direct Sourcing from Lahore’s Historic Scrap Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            PAKISTAN'S TRUSTED HUB FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400 font-heading tracking-wide">
              GENUINE, KABLI & AFTERMARKET
            </span> AUTO PARTS
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Directly unbolted from Japanese scrap auctions & OEM warehouses. Compression-tested, bench-verified, with 7-Day checking warranty & same-day cargo dispatch across Pakistan.
          </p>

          {/* Quick Value Metrics */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-md border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>7-Day Checking Warranty</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-md border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>WhatsApp Video Inspection</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-md border border-slate-800">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>Nationwide Cargo Bilty</span>
            </div>
          </div>
        </div>

        {/* Interactive 3-Step Vehicle Part Finder Box */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#1E293B] to-[#141d2c] p-4 sm:p-7 rounded-2xl border border-slate-700/80 shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                <Car className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  SELECT YOUR VEHICLE FOR 100% FITMENT MATCH
                </h3>
                <p className="text-xs text-slate-400">
                  Select Make, Model & Year to instantly filter guaranteed compatible spare parts
                </p>
              </div>
            </div>

            {(selectedMake || activeVehicle) && (
              <button
                onClick={handleReset}
                type="button"
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 underline transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Vehicle
              </button>
            )}
          </div>

          <form onSubmit={handleFindParts} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Step 1: Make */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <span>1. Car Make</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedMake}
                onChange={handleMakeChange}
                className="w-full bg-slate-900/90 text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition cursor-pointer font-medium"
              >
                <option value="">-- Choose Make --</option>
                {availableMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Model */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                2. Car Model
              </label>
              <select
                value={selectedModel}
                onChange={handleModelChange}
                disabled={!selectedMake}
                className="w-full bg-slate-900/90 text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedMake ? '-- Choose Model --' : 'Select Make First'}
                </option>
                {availableModels.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Year */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                3. Model Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={!selectedModel}
                className="w-full bg-slate-900/90 text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedModel ? '-- All Compatible Years --' : 'Select Model First'}
                </option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-3 lg:col-span-1 flex items-end">
              <button
                type="submit"
                disabled={!selectedMake}
                className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-red-950/60 border border-red-500/50 flex items-center justify-center gap-2 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Search className="w-4 h-4" />
                <span>Find Parts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>

          {/* Quick Condition Filters Bar Inside Finder */}
          <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Quick Condition Filter:</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => onQuickFilterCondition(activeCondition === 'kabli' ? 'all' : 'kabli')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  activeCondition === 'kabli'
                    ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900 text-sky-400 border-sky-500/30 hover:bg-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                Japanese Kabli (Tested)
              </button>

              <button
                type="button"
                onClick={() => onQuickFilterCondition(activeCondition === 'oem' ? 'all' : 'oem')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  activeCondition === 'oem'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-900 text-emerald-400 border-emerald-500/30 hover:bg-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Brand New OEM Original
              </button>

              <button
                type="button"
                onClick={() => onQuickFilterCondition(activeCondition === 'aftermarket' ? 'all' : 'aftermarket')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  activeCondition === 'aftermarket'
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                High-Quality Aftermarket
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
