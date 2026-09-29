import React, { useState } from 'react';
import { 
  X, CheckCircle2, Truck, MapPin, 
  CreditCard, MessageSquare, ArrowRight, 
  Building2, Wallet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NATIONWIDE_CARGO_HUBS } from '../data/products';
import { 
  formatPKR, 
  getCartCheckoutWhatsAppUrl
} from '../utils/whatsapp';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onOrderSuccess 
}) {
  const [deliveryMode, setDeliveryMode] = useState('cargo'); // 'cargo' | 'lahore-local'
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' | 'jazzcash' | 'cod'
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Find cargo hub data
  const currentHub = NATIONWIDE_CARGO_HUBS.find(h => h.city === selectedCity) || NATIONWIDE_CARGO_HUBS[0];
  const cargoFee = deliveryMode === 'lahore-local' ? 300 : (currentHub ? currentHub.estBilty : 650);
  const grandTotal = subtotal + cargoFee;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone/WhatsApp number');
      return;
    }

    const orderId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(orderId);
    setOrderComplete(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback gracefully
    }

    onOrderSuccess();
  };

  const getWhatsAppSubmitLink = () => {
    const cargoDetails = {
      method: deliveryMode === 'lahore-local' ? 'Lahore Local Delivery / COD' : 'Nationwide Bilty Cargo',
      fee: cargoFee,
      terminal: deliveryMode === 'lahore-local' ? 'Lahore Local Dispatch' : `${currentHub.carrier} (${selectedCity} Terminal)`
    };

    const customerDetails = {
      name,
      phone,
      city: deliveryMode === 'lahore-local' ? 'Lahore' : selectedCity,
      address
    };

    return getCartCheckoutWhatsAppUrl(cartItems, customerDetails, cargoDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Truck className="w-5 h-5 text-red-500" />
            <h2 className="font-heading text-lg font-bold text-white tracking-wide">
              {orderComplete ? 'ORDER CONFIRMATION' : 'NATIONWIDE BILTY & CARGO CHECKOUT'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {orderComplete ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                  Order Successfully Registered
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Thank You, {name}!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Your Bilal Ganj Auto Parts order has been booked under Tracking ID: <span className="font-mono text-amber-400 font-bold">{generatedOrderId}</span>.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="text-white font-mono font-bold">{generatedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Items:</span>
                  <span className="text-white">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} parts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping Mode:</span>
                  <span className="text-sky-400 font-medium">
                    {deliveryMode === 'lahore-local' ? 'Lahore Local Delivery' : `Bilty Cargo to ${selectedCity}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
                  <span className="text-white">Grand Total:</span>
                  <span className="text-emerald-400">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              {/* Finalize WhatsApp Action */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <a
                  href={getWhatsAppSubmitLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Order to Bilal Ganj WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Delivery Method Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  1. Select Delivery System
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  <div
                    onClick={() => setDeliveryMode('cargo')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                      deliveryMode === 'cargo'
                        ? 'bg-slate-800/90 border-red-500 ring-1 ring-red-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Truck className={`w-5 h-5 mt-0.5 ${deliveryMode === 'cargo' ? 'text-red-500' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-white">All Pakistan Bilty Cargo</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Faisal Movers / Daewoo Express / Asia Cargo bus terminals
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setDeliveryMode('lahore-local');
                      setSelectedCity('Lahore');
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                      deliveryMode === 'lahore-local'
                        ? 'bg-slate-800/90 border-red-500 ring-1 ring-red-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <MapPin className={`w-5 h-5 mt-0.5 ${deliveryMode === 'lahore-local' ? 'text-red-500' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-white">Lahore Local Delivery / Pickup</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Same-day COD or collect at Bilal Ganj scrap shop
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* City & Cargo Terminal Selection */}
              {deliveryMode === 'cargo' && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Destination City (Bilty Cargo Hub):
                    </label>
                    <span className="text-[11px] text-sky-400 font-medium">
                      Est. Bilty Freight: {formatPKR(currentHub?.estBilty || 650)}
                    </span>
                  </div>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    {NATIONWIDE_CARGO_HUBS.map(hub => (
                      <option key={hub.city} value={hub.city}>
                        {hub.city} — {hub.carrier} ({hub.estTime} transit)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                    <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      Cargo Bilty booking receipt & tracking number will be shared on WhatsApp as soon as parcel is handed over.
                    </span>
                  </div>
                </div>
              )}

              {/* Customer Contact & Address Form */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  2. Recipient Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp Number (+92) *"
                      className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      deliveryMode === 'cargo' 
                        ? 'Nearest Bus Terminal / Cargo Station (or Home Address for courier delivery)...' 
                        : 'Complete Street Address in Lahore / Near Landmark...'
                    }
                    className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm p-3 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Payment Instructions Accordion */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  3. Payment Method
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'bank'
                        ? 'bg-slate-800 border-red-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1 text-red-400" />
                    <div className="font-bold">Meezan / Alfalah</div>
                    <div className="text-[10px] text-slate-400">Online Bank Transfer</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'jazzcash'
                        ? 'bg-slate-800 border-red-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Wallet className="w-4 h-4 mb-1 text-amber-400" />
                    <div className="font-bold">JazzCash / EasyPaisa</div>
                    <div className="text-[10px] text-slate-400">Mobile Wallet</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-slate-800 border-red-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-emerald-400" />
                    <div className="font-bold">Cash on Delivery</div>
                    <div className="text-[10px] text-slate-400">
                      {deliveryMode === 'lahore-local' ? 'Available in Lahore' : 'Advance for Bilty'}
                    </div>
                  </div>
                </div>

                {/* Payment Detail Notice */}
                <div className="mt-3 p-3 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800">
                  {paymentMethod === 'bank' && (
                    <div className="space-y-1">
                      <p className="font-bold text-slate-200">Meezan Bank Limited (Bilal Ganj Branch, Lahore):</p>
                      <p className="font-mono text-emerald-400 text-xs">Title: Bilal Ganj Auto Parts | A/C: 0284-0104889211</p>
                      <p className="text-[11px] text-slate-400">Share transaction screenshot on WhatsApp +92 301 7928133 for instant dispatch confirmation.</p>
                    </div>
                  )}
                  {paymentMethod === 'jazzcash' && (
                    <div className="space-y-1">
                      <p className="font-bold text-slate-200">JazzCash / EasyPaisa Merchant Account:</p>
                      <p className="font-mono text-amber-400 text-xs">Number: 0301-7928133 | Name: Bilal Ganj Auto Parts</p>
                      <p className="text-[11px] text-slate-400">Instant SMS confirmation received right at our shop counter.</p>
                    </div>
                  )}
                  {paymentMethod === 'cod' && (
                    <div className="space-y-1">
                      <p className="font-bold text-slate-200">Cash on Delivery (COD) Guidelines:</p>
                      <p className="text-[11px] text-slate-400">
                        {deliveryMode === 'lahore-local'
                          ? 'Pay when your package arrives at your doorstep in Lahore or upon physical pickup at our Bilal Ganj counter.'
                          : 'For nationwide Cargo / Bilty, minimum booking freight advance is required, balance payable at cargo station.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Calculation Breakdown */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Parts Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items):</span>
                  <span className="font-bold font-sans text-white">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Freight / Bilty Charge:</span>
                  <span className="font-bold font-sans text-sky-400">{formatPKR(cargoFee)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold">
                  <span className="text-white">Estimated Grand Total:</span>
                  <span className="text-emerald-400 text-base font-sans">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <span>Confirm Order & Generate Bilty Invoice</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
