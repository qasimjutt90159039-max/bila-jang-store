import React, { useState } from 'react';
import { 
  CheckCircle2, Video, ShoppingCart, MessageSquare, 
  Copy, Check, Star, Shield, AlertTriangle, Eye
} from 'lucide-react';
import { 
  formatPKR, 
  getProductWhatsAppOrderUrl, 
  getPartInspectionVideoWhatsAppUrl 
} from '../utils/whatsapp';
import { CONDITIONS } from '../data/products';

export default function ProductCard({ 
  product, 
  selectedVehicle, 
  onAddToCart, 
  onQuickView 
}) {
  const [copiedOem, setCopiedOem] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Check compatibility
  const isCompatible = selectedVehicle && selectedVehicle.make
    ? (
        product.make.toLowerCase() === selectedVehicle.make.toLowerCase() &&
        (
          selectedVehicle.model === 'All Models' || 
          product.model.toLowerCase().includes(selectedVehicle.model.toLowerCase()) ||
          selectedVehicle.model.toLowerCase().includes(product.model.toLowerCase()) ||
          (product.compatibleVehicles && product.compatibleVehicles.some(v => v.toLowerCase().includes(selectedVehicle.model.toLowerCase())))
        ) &&
        (
          !selectedVehicle.year ||
          !product.yearRange ||
          (selectedVehicle.year >= product.yearRange[0] && selectedVehicle.year <= product.yearRange[1])
        )
      )
    : null;

  // Condition styling lookup
  const conditionMeta = CONDITIONS.find(c => c.id === product.condition) || CONDITIONS[0];

  const handleCopyOem = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.oemNumber);
    setCopiedOem(true);
    setTimeout(() => setCopiedOem(false), 2000);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const orderWhatsAppUrl = getProductWhatsAppOrderUrl(product, selectedVehicle);
  const videoRequestWhatsAppUrl = getPartInspectionVideoWhatsAppUrl(product, selectedVehicle);

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-[#1E293B] hover:bg-[#222f42] rounded-2xl border border-slate-700/80 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/20 cursor-pointer relative"
    >
      
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-black/40"></div>

        {/* Top Badges: Condition & Stock */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border backdrop-blur-md ${conditionMeta.color}`}>
            {conditionMeta.badge}
          </span>

          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            In Stock
          </span>
        </div>

        {/* Video Inspection Prompt Tag for Kabli/Used parts */}
        {product.condition === 'kabli' && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-950/80 text-red-200 border border-red-500/40 backdrop-blur-sm">
              <Video className="w-3 h-3 text-red-400" />
              Video Verified
            </span>
          </div>
        )}

        {/* Quick View Hover Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700/80 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg cursor-pointer"
          title="Quick View Specifications"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Fitment Compatibility Bar */}
          <div className="mb-2.5">
            {isCompatible === true && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-md border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">✓ Fits {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ''}</span>
              </div>
            )}

            {isCompatible === false && (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400 bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/30">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">May not fit {selectedVehicle.make} {selectedVehicle.model}</span>
              </div>
            )}

            {isCompatible === null && (
              <div className="text-[11px] text-slate-400 font-medium truncate">
                🚗 Fits: <span className="text-slate-200">{product.make} {product.model} ({product.yearRange ? `${product.yearRange[0]}-${product.yearRange[1]}` : 'Multi-model'})</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
            {product.name}
          </h3>

          {/* OEM Number with 1-Click Copy */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <button
              onClick={handleCopyOem}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80 font-mono text-[11px] transition cursor-pointer"
              title="Click to copy OEM Part Number"
            >
              <span>OEM: {product.oemNumber}</span>
              {copiedOem ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          {/* Warranty & Depot info */}
          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3 h-3" />
              <span className="truncate">{product.warranty}</span>
            </div>
            <p className="truncate text-slate-400 text-[10px]">
              📍 {product.stockStatus}
            </p>
          </div>
        </div>

        {/* Pricing & Call-to-actions */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
          
          {/* Price Tag */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 mr-1">Price:</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400 font-sans tracking-tight">
                {formatPKR(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Interactive Button Group */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* 1-Click WhatsApp Order */}
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition active:scale-95 text-center"
              title="Order directly via WhatsApp chat with pre-filled part details"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Order WhatsApp</span>
            </a>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl font-bold text-xs shadow-md transition active:scale-95 cursor-pointer ${
                justAdded 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/40'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

          </div>

          {/* Request Video/Photos Button for Kabli & Mechanical */}
          <a
            href={videoRequestWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-semibold transition"
          >
            <Video className="w-3 h-3 text-red-400" />
            <span>Request Live Part Video / Photos</span>
          </a>

        </div>

      </div>

    </div>
  );
}
