import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, Video, ShoppingCart, 
  MessageSquare, Copy, Check, Star, Car
} from 'lucide-react';
import { 
  formatPKR, 
  getProductWhatsAppOrderUrl, 
  getPartInspectionVideoWhatsAppUrl 
} from '../utils/whatsapp';
import { CONDITIONS } from '../data/products';
import AutoPartImage from './AutoPartImage';

export default function ProductModal({ 
  product, 
  selectedVehicle, 
  onClose, 
  onAddToCart 
}) {
  const [copiedOem, setCopiedOem] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const conditionMeta = CONDITIONS.find(c => c.id === product.condition) || CONDITIONS[0];

  const handleCopyOem = () => {
    navigator.clipboard.writeText(product.oemNumber);
    setCopiedOem(true);
    setTimeout(() => setCopiedOem(false), 2000);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const orderWhatsAppUrl = getProductWhatsAppOrderUrl(product, selectedVehicle);
  const videoRequestWhatsAppUrl = getPartInspectionVideoWhatsAppUrl(product, selectedVehicle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-4xl bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Title & Close button */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-700 bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${conditionMeta.color}`}>
              {conditionMeta.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              ID: {product.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Product Media Section */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                <AutoPartImage 
                  src={product.image} 
                  alt={product.name}
                  name={product.name}
                  category={product.category}
                  oem={product.oemNumber}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    📍 {product.stockStatus}
                  </span>
                </div>
              </div>

              {/* Quality & Inspection Checklist */}
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Bilal Ganj Testing & Inspection Protocol
                </h4>
                
                <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{product.conditionGrade || 'Grade-A Tested Part'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{product.warranty}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Same-day Bilty dispatch to your nearest Bus terminal / Cargo office</span>
                  </li>
                </ul>
              </div>

              {/* Request Video CTA */}
              <a
                href={videoRequestWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-sky-500/30 font-bold text-xs transition"
              >
                <Video className="w-4 h-4 text-sky-400" />
                <span>Request Real-time Shop Test Video on WhatsApp</span>
              </a>
            </div>

            {/* Right: Technical Specs & Pricing */}
            <div className="flex flex-col justify-between space-y-4">
              
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {product.name}
                </h2>

                {/* Rating & OEM code */}
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating} / 5.0</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount} customer reviews)</span>
                  </div>

                  <button
                    onClick={handleCopyOem}
                    className="flex items-center gap-1.5 text-xs font-mono bg-slate-900 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700 hover:border-slate-500 transition cursor-pointer"
                  >
                    <span>OEM: {product.oemNumber}</span>
                    {copiedOem ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Description */}
                <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  {product.description}
                </div>

                {/* Compatible Vehicles */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-red-500" />
                    Compatible Car Models
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibleVehicles ? (
                      product.compatibleVehicles.map((veh, i) => (
                        <span key={i} className="text-[11px] bg-slate-900 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                          {veh}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-300">
                        {product.make} {product.model}
                      </span>
                    )}
                  </div>
                </div>

                {/* Technical Specs Table */}
                {product.specs && (
                  <div className="mt-4 border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-900 px-3 py-1.5 font-bold text-slate-300 border-b border-slate-800">
                      Technical Specifications
                    </div>
                    <div className="divide-y divide-slate-800/60 bg-slate-900/30">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-2 px-3 py-1.5">
                          <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-slate-200 font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Price & Order Actions */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Total Price: </span>
                    <span className="text-2xl font-black text-emerald-400 font-sans">
                      {formatPKR(product.price * quantity)}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPKR(product.originalPrice * quantity)}
                    </span>
                  )}
                </div>

                {/* Quantity selector & Add to Cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-300 hover:bg-slate-800 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-slate-300 hover:bg-slate-800 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/40 transition active:scale-95 cursor-pointer"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 1-Click WhatsApp Button */}
                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition active:scale-95 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant Order via Bilal Ganj WhatsApp</span>
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
