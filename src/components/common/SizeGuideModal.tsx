import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { SIZE_CHART } from '../../data/defaultData';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 border border-zinc-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-zinc-900" />
              <h3 className="font-serif text-lg font-bold text-zinc-950 uppercase tracking-wider">
                Size & Measurement Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gender Tabs */}
          <div className="flex gap-2 mt-4 border-b border-zinc-200 pb-2">
            <button
              onClick={() => setActiveTab('men')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                activeTab === 'men'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Men's Sizing (Inches)
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                activeTab === 'women'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Women's Sizing (Inches)
            </button>
          </div>

          {/* Measurement Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs border border-zinc-200 rounded-sm">
              <thead className="bg-zinc-100 text-zinc-700 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-2.5 border-b border-zinc-200">Size</th>
                  <th className="p-2.5 border-b border-zinc-200">Chest</th>
                  <th className="p-2.5 border-b border-zinc-200">Garment Length</th>
                  <th className="p-2.5 border-b border-zinc-200">
                    {activeTab === 'men' ? 'Shoulder' : 'Waist'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-800">
                {activeTab === 'men'
                  ? SIZE_CHART.men.map((row) => (
                      <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                        <td className="p-2.5 font-bold text-zinc-950">{row.size}</td>
                        <td className="p-2.5">{row.chest}</td>
                        <td className="p-2.5">{row.length}</td>
                        <td className="p-2.5">{row.shoulder}</td>
                      </tr>
                    ))
                  : SIZE_CHART.women.map((row) => (
                      <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                        <td className="p-2.5 font-bold text-zinc-950">{row.size}</td>
                        <td className="p-2.5">{row.chest}</td>
                        <td className="p-2.5">{row.length}</td>
                        <td className="p-2.5">{row.waist}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Measuring tips */}
          <div className="mt-5 p-3.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-600 space-y-1.5">
            <h5 className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Fitting Advice</span>
            </h5>
            <p className="text-[11px] leading-relaxed">
              • <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the measuring tape horizontal.
            </p>
            <p className="text-[11px] leading-relaxed">
              • <strong>Exchange Policy:</strong> If size does not fit perfectly, our 7-day hassle-free exchange service covers doorstep swap across Pakistan.
            </p>
          </div>

          <div className="mt-5 text-right">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-5 py-2 bg-zinc-950 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
