import React, { useState } from 'react';
import { 
  X, Sparkles, MessageSquare 
} from 'lucide-react';
import { getCustomPartRequestWhatsAppUrl } from '../utils/whatsapp';

export default function CustomPartModal({ isOpen, onClose }) {
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2015');
  const [partName, setPartName] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model || !partName) {
      alert('Please specify the Car Model and the Part you need.');
      return;
    }

    const url = getCustomPartRequestWhatsAppUrl({
      make,
      model,
      year,
      partName,
      chassisNumber,
      notes
    });

    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white tracking-wide">
                CAN'T FIND YOUR PART?
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct Bilal Ganj Yard Scouting & Half-Cut Sourcing
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
            Bilal Ganj holds hundreds of imported Japanese cut cars & mechanical spares not yet listed online. Our scouts will physically inspect the yard sheds for your exact requirement.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Car Make
              </label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none cursor-pointer"
              >
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Daihatsu">Daihatsu</option>
                <option value="Kia">Kia</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Nissan">Nissan</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Mercedes / BMW">Mercedes / BMW</option>
                <option value="Other">Other Make</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Car Model *
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Corolla Altis, Civic, Vitz"
                className="w-full bg-slate-900 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Model Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2017"
                className="w-full bg-slate-900 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Chassis / Frame No (Optional)
              </label>
              <input
                type="text"
                value={chassisNumber}
                onChange={(e) => setChassisNumber(e.target.value)}
                placeholder="e.g. NZE141-1029482"
                className="w-full bg-slate-900 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Part Name & Description *
            </label>
            <input
              type="text"
              required
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              placeholder="e.g. ABS actuator pump / Front left steering knuckle / ECU"
              className="w-full bg-slate-900 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Additional Details or Part Photo Reference
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Prefer Japanese kabli or brand new OEM? Any specific engine code?"
              className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Part Request to Bilal Ganj WhatsApp</span>
          </button>

        </form>

      </div>

    </div>
  );
}
