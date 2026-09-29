import React from 'react';
import { 
  X, Trash2, ShoppingBag, ArrowRight, MessageSquare, 
  ShieldCheck, Truck, Plus, Minus
} from 'lucide-react';
import { formatPKR, buildWhatsAppUrl } from '../utils/whatsapp';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Instant WhatsApp whole cart order link
  const handleWhatsAppQuickCartOrder = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems.map((item, idx) => 
      `${idx + 1}. *${item.name}* (OEM: ${item.oemNumber})\n   Qty: ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`
    ).join('\n\n');

    const message = `Salam Bilal Ganj Auto Parts Lahore! 🛒
I would like to order my shopping cart items:

${lines}

*Subtotal*: ${formatPKR(subtotal)}

Please check stock at your Bilal Ganj depot and send payment / Bilty cargo details to my city.`;

    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1E293B] border-l border-slate-700 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="font-heading text-lg font-bold text-white tracking-wide">
                YOUR PARTS CART
              </h2>
              <span className="text-xs bg-red-600/30 text-red-400 font-bold px-2 py-0.5 rounded-full border border-red-500/40">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-800/80">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800 text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Add genuine OEM, Japanese kabli, or aftermarket spare parts from our Bilal Ganj catalog.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Explore Parts Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-xl border border-slate-700 bg-slate-900 shrink-0" 
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-400 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1 rounded">
                          {item.oemNumber}
                        </span>
                        <span className="text-[10px] text-red-400 font-semibold uppercase">
                          {item.condition}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-emerald-400 font-sans">
                        {formatPKR(item.price * item.quantity)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-1 text-xs font-bold text-slate-200 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-700 bg-slate-900/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Cart Subtotal</span>
                  <span className="font-bold text-white font-sans text-sm">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-sky-400" />
                    Nationwide Bilty / COD
                  </span>
                  <span className="text-sky-400 font-medium">Calculated at checkout</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <span>Proceed to Cargo & Bilty Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppQuickCartOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Cart Directly to WhatsApp</span>
                </button>
              </div>

              <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                <span>All Kabli parts bench-checked with 7-day warranty</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
