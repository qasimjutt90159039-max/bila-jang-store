import React from 'react';
import { 
  X, Truck, MapPin, MessageSquare 
} from 'lucide-react';
import { NATIONWIDE_CARGO_HUBS } from '../data/products';
import { formatPKR, WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function NationwideCargoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white tracking-wide">
                NATIONWIDE CARGO & BILTY SHIPPING NETWORK
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct Daily Bus Cargo & Freight Dispatch from Bilal Ganj, Lahore
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          {/* How Bilty System Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 font-bold flex items-center justify-center text-xs mb-2">1</span>
              <h4 className="font-bold text-white text-xs">Video Check & Packing</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Part is inspected, cleaned, and a WhatsApp video is shared. Heavy parts are crated in wooden boxes; headlights are bubble wrapped.
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center text-xs mb-2">2</span>
              <h4 className="font-bold text-white text-xs">Cargo Dispatch & Bilty Slip</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Booked at Faisal Movers or Daewoo Cargo before 7:00 PM PKT. Official Bilty receipt photo with tracking number is sent to your WhatsApp.
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center text-xs mb-2">3</span>
              <h4 className="font-bold text-white text-xs">Terminal Pickup</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Collect parcel from your city's bus terminal or cargo office. 7-Day checking warranty activates upon receipt.
              </p>
            </div>
          </div>

          {/* Rates and Hubs Table */}
          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-500" />
              Major City Terminals, Freight & Transit Schedule
            </h3>

            <div className="border border-slate-700/80 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                    <th className="p-2.5">Destination City</th>
                    <th className="p-2.5">Cargo Carriers</th>
                    <th className="p-2.5">Transit Time</th>
                    <th className="p-2.5 text-right">Est. Bilty Freight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {NATIONWIDE_CARGO_HUBS.map((hub) => (
                    <tr key={hub.city} className="hover:bg-slate-800/40 transition">
                      <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {hub.city}
                      </td>
                      <td className="p-2.5 text-slate-300">{hub.carrier}</td>
                      <td className="p-2.5 text-sky-400 font-mono">{hub.estTime}</td>
                      <td className="p-2.5 text-right font-black text-emerald-400 font-sans">
                        {formatPKR(hub.estBilty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              * Rates are indicative for standard parcels (shocks, brake pads, sensors, headlights). Heavy engine assemblies and gearboxes are billed by actual weight on cargo scale.
            </p>
          </div>

          {/* Lahore Local Delivery Box */}
          <div className="bg-gradient-to-r from-red-950/40 to-slate-900 p-4 rounded-xl border border-red-900/40 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-xs">Lahore Local Customers:</h4>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Same-day bike runner / rickshaw delivery across Lahore (Gulberg, DHA, Bahria, Johar Town, Model Town, Mughalpura) with Cash on Delivery (COD), or you can visit our Bilal Ganj shop directly for physical inspection and pickup.
              </p>
            </div>
          </div>

          {/* WhatsApp Cargo Helpline */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div>
              <span className="font-bold text-white text-xs block">Need custom cargo booking or urgent overnight courier?</span>
              <span className="text-slate-400 text-[11px]">Contact our Bilal Ganj dispatch desk directly</span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20Bilal%20Ganj!%20I%20have%20a%20question%20regarding%20cargo%20bilty%20shipping.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
