import React, { useState } from 'react';
import { 
  Wrench, Phone, Mail, MapPin, ShieldCheck, 
  HelpCircle, ChevronDown, ChevronUp, Clock, Truck, 
  MessageSquare, Star
} from 'lucide-react';
import { 
  HELPLINE_PHONE, 
  WHATSAPP_NUMBER, 
  BUSINESS_EMAIL, 
  BUSINESS_NAME, 
  WAREHOUSE_LOCATION 
} from '../utils/whatsapp';

export default function Footer({ onOpenCargoModal, onOpenCustomPartModal }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is a "Japanese Kabli" part and what warranty is included?',
      a: 'Japanese Kabli parts are authentic components dismantled from low-mileage imported scrap/cut cars in Japan. Every part undergoes bench testing, compression checks, and electrical continuity verification. We provide a 7-Day Checking Warranty from the day of Bilty collection.'
    },
    {
      q: 'How does Nationwide Bilty Cargo shipping work across Pakistan?',
      a: 'We pack and book parts same-day via Faisal Movers Cargo, Daewoo Express, or Asia Cargo from our Lahore depot. As soon as the bus carrier books the parcel, we WhatsApp you the actual photo of the Bilty receipt with the tracking consignment number.'
    },
    {
      q: 'Can I inspect the actual part photos/video before placing an order?',
      a: 'Yes, 100%! We encourage our customers to click "Request Part Video/Photos". Our technician in Bilal Ganj will record a 360-degree video, show the OEM stamp, and demonstrate compression/rotation on the test bench.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'For Lahore local orders, we offer Cash on Delivery (COD) and direct shop counter pickup. For nationwide bus cargo / Bilty, we accept advance transfers via Meezan Bank, Bank Alfalah, JazzCash, or EasyPaisa.'
    },
    {
      q: 'What happens if a part does not fit my vehicle?',
      a: 'If our fitment recommendation was incorrect, we provide a 100% hassle-free exchange or refund within the 7-day checking period, provided the part has not been opened, modified, or tampered with.'
    }
  ];

  return (
    <footer className="bg-[#080c13] text-slate-300 border-t border-slate-800 text-xs transition-colors">
      
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">7-Day Testing Warranty</h4>
              <p className="text-slate-400 text-[11px]">On all Japanese Kabli mechanical parts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Nationwide Bilty Cargo</h4>
              <p className="text-slate-400 text-[11px]">Daewoo & Faisal Movers daily dispatch</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">WhatsApp Video Proof</h4>
              <p className="text-slate-400 text-[11px]">Live bench test clips before shipping</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">4.6 / 5.0 Rating</h4>
              <p className="text-slate-400 text-[11px]">Bilal Ganj Verified Merchant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Profile */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black shadow-md shadow-red-900/40">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-wider text-white">
                  BILAL GANJ AUTO PARTS
                </span>
                <span className="text-[10px] text-red-400 font-bold block uppercase tracking-widest">
                  & SHOP LAHORE
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan's premier automotive spare parts hub. Direct suppliers of genuine OEM boxed parts, low-mileage Japanese Kabli scrap assemblies, and certified high-grade aftermarket spares.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{WAREHOUSE_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-emerald-400 font-bold">
                  {HELPLINE_PHONE} (WhatsApp & Calls)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-sky-400 font-mono">
                  {BUSINESS_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 9:00 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">
              Spare Part Categories
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Engine & Transmission</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Suspension & Steering Racks</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Brake Rotors & ABS Pumps</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">LED Headlights & Body Panels</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">AC Compressors & Radiators</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">ECU Computers & Sensors</a></li>
            </ul>
          </div>

          {/* Vehicle Compatibility */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">
              Popular Vehicles
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Toyota Corolla GLi / Altis</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Honda Civic Reborn & Turbo</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Suzuki Alto 660cc & Mehran</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Toyota Vitz & Passo Japanese</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Toyota Hilux Revo & Rocco</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition">Suzuki Cultus & Swift</a></li>
            </ul>
          </div>

          {/* Bilty & Sourcing Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">
              Customer Services
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={onOpenCargoModal} className="hover:text-sky-400 transition text-left cursor-pointer">
                  Nationwide Bilty Rates & Tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomPartModal} className="hover:text-amber-400 transition text-left cursor-pointer">
                  Scrap Half-Cut Sourcing Request
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20Bilal%20Ganj!%20I%20want%20to%20claim%20warranty%20check.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition"
                >
                  7-Day Checking Warranty Claim
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20Bilal%20Ganj!%20Where%20is%20your%20shop%20located%20in%20Lahore?`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-red-400 transition"
                >
                  Visit Lahore Shop (Map Directions)
                </a>
              </li>
            </ul>

            {/* Accepted Payments Icons */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">Meezan Bank</span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">Bank Alfalah</span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">JazzCash</span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">EasyPaisa</span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-emerald-400 font-bold">COD Lahore</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cargo & Warranty FAQs Accordion */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-red-500" />
            Frequently Asked Questions (Cargo Bilty & Checking Warranty)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-bold text-slate-200 hover:text-white flex items-center justify-between text-xs cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-red-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800/50 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 {BUSINESS_NAME}. All rights reserved. Prices in Pakistani Rupees (PKR).</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Warranty & Exchange Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Cargo Freight Guidelines</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
