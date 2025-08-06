'use client';

import { useState } from 'react';
// import { FiMenu, FiX } from 'react-icons/fi'; // Menggunakan react-icons untuk ikon
import { FcMindMap, FcSmartphoneTablet, FcWorkflow, FcList, FcNext, FcPrevious } from "react-icons/fc";

export default function Sidebar({ onSearch, onClear, isLoading }) {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    mcc: '510',
    radioType: 'Pilih jaringan', // Default ke 4G (LTE) yang lebih umum
    mnc: 'Pilih Provider', // Default ke Telkomsel
    lac: '',
    cid: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
    if (window.innerWidth < 1024) { // Tutup sidebar di mobile setelah search
        setIsOpen(false);
    }
  };

  const handleClear = () => {
    setFormData({
      mcc: '510',
      radioType: 'Pilih Jaringan',
      mnc: 'Pilih Provider',
      lac: '',
      cid: '',
    });
    onClear();
  };

  return (
    <>
      {/* Tombol menu untuk mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-2 z-30 p-2 bg-gray-800 text-white rounded-md lg:hidden hover:bg-gray-700 transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FcPrevious size={20} /> : <FcNext size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-20 w-80 shadow-2xl flex flex-col`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FcMindMap />
            PELACAKAN JANDA
          </h2>
          <p className="text-sm text-red-400 font-bold">UNIT 5 RESMOB POLDA METRO JAYA</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow overflow-y-auto">
          {/* MCC */}
          <div>
            <label htmlFor="mcc" className="block text-sm font-medium text-gray-300">MCC</label>
            <select id="mcc" value={formData.mcc} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5">
              <option value="510">510 (Indonesia)</option>
            </select>
          </div>

          {/* Tipe Radio */}
          <div>
            <label htmlFor="radioType" className="block text-sm font-medium text-gray-300">Tipe Radio</label>
            <select id="radioType" value={formData.radioType} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5">
              <option value="pilih-jaringan">Pilih Jaringan</option>
              <option value="gsm">GSM</option>
              <option value="umts">UMTS (3G)</option>
              <option value="lte">LTE (4G)</option>
              <option value="nbiot">NB-IoT</option>
            </select>
          </div>

          {/* Provider */}
          <div>
            <label htmlFor="mnc" className="block text-sm font-medium text-gray-300">Provider (MNC)</label>
            <select id="mnc" value={formData.mnc} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5">
              <option value="pilih-provider">Pilih Provider</option>
              <option value="10">Telkomsel</option>
              <option value="01">Indosat Ooredoo</option>
              <option value="11">XL Axiata</option>
              <option value="21">IM3</option>
              <option value="89">3 (Three)</option>
              <option value="09">Smartfren</option>
            </select>
          </div>

          {/* LAC */}
          <div>
            <label htmlFor="lac" className="block text-sm font-medium text-gray-300">LAC (Location Area Code)</label>
            <input type="number" id="lac" value={formData.lac} onChange={handleChange} required className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5" placeholder="e.g., 40401" />
          </div>

          {/* CID */}
          <div>
            <label htmlFor="cid" className="block text-sm font-medium text-gray-300">CID (Cell ID)</label>
            <input type="number" id="cid" value={formData.cid} onChange={handleChange} required className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5" placeholder="e.g., 12345678" />
          </div>

          {/* Tombol Aksi */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {<FcSmartphoneTablet />} {isLoading ? 'Melacak...' : 'MENYALA ABANGKU'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              {<FcWorkflow />}Bersihkan Form
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
