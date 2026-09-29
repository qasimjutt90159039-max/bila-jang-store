import React from 'react';
import { 
  Cpu, Layers, Disc, SunMedium, Snowflake, Zap, 
  ArrowUpDown, Box
} from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/products';

// Mapping for dynamic icons
const CATEGORY_ICONS = {
  Cpu,
  Layers,
  Disc,
  SunMedium,
  Snowflake,
  Zap
};

export default function FilterBar({ 
  selectedCategory, 
  onSelectCategory, 
  selectedCondition, 
  onSelectCondition, 
  sortBy, 
  onSelectSort,
  inStockOnly,
  onToggleInStock,
  totalResults
}) {
  return (
    <div id="catalog-section" className="bg-[#111827] border-b border-slate-800 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Category Horizontal Scrolling Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Browse Categories
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-bold">{totalResults}</span> Parts
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
            <button
              onClick={() => onSelectCategory('all')}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>All Categories</span>
            </button>

            {CATEGORIES.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.icon] || Box;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-red-400'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Condition Filters & Sorting Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          
          {/* Condition Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">
              Condition:
            </span>
            
            <button
              onClick={() => onSelectCondition('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                selectedCondition === 'all'
                  ? 'bg-slate-200 text-slate-900 border-white'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              All Types
            </button>

            {CONDITIONS.map((cond) => {
              const isSelected = selectedCondition === cond.id;
              return (
                <button
                  key={cond.id}
                  onClick={() => onSelectCondition(cond.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? cond.color + ' ring-1 ring-current font-extrabold shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cond.dotColor}`}></span>
                  {cond.label}
                </button>
              );
            })}
          </div>

          {/* Right Tools: In-Stock Filter & Sorting */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* In-Stock Only Switch */}
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onToggleInStock(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 bg-slate-900 border-slate-700 focus:ring-red-500 cursor-pointer"
              />
              <span className="text-[11px] sm:text-xs">Lahore Depot In Stock</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => onSelectSort(e.target.value)}
                className="bg-transparent text-slate-200 font-medium text-xs focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-slate-200">Featured</option>
                <option value="price-asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-slate-200">Top Customer Rating</option>
                <option value="name" className="bg-slate-900 text-slate-200">Part Name (A-Z)</option>
              </select>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
