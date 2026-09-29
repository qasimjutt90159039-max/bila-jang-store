import React from 'react';
import { Car, CheckCircle2, X, RefreshCw } from 'lucide-react';

export default function ActiveGarageBanner({ 
  selectedVehicle, 
  matchingCount, 
  onClear, 
  onChangeVehicle 
}) {
  if (!selectedVehicle || !selectedVehicle.make) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-y border-emerald-500/30 px-4 py-2.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] bg-emerald-600/40 px-2 py-0.5 rounded">
                Active Garage
              </span>
              <span className="text-emerald-300 font-bold text-sm">
                {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year ? `(${selectedVehicle.year})` : ''}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
              Showing <span className="font-bold text-emerald-400">{matchingCount}</span> parts verified guaranteed compatible
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onChangeVehicle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Change Car</span>
          </button>
          
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900/60 border border-red-800/40 text-xs font-bold transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Show All Parts</span>
          </button>
        </div>

      </div>
    </div>
  );
}
