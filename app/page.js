'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from './components/Sidebar';

// Import dinamis untuk komponen Peta karena Leaflet butuh akses ke objek 'window'
const Map = dynamic(() => import('./components/Map'), { 
  ssr: false 
});

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (formData) => {
    setIsLoading(true);
    setError('');
    setLocation(null);

    try {
      const response = await fetch('/api/unwired', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setLocation({
          lat: data.lat,
          lon: data.lon,
          accuracy: data.accuracy,
          address: data.address,
        });
      } else {
        setError(data.message || 'Gagal menemukan lokasi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocation(null);
    setError('');
  }

  return (
    <main className="flex h-screen bg-gray-100">
      <Sidebar onSearch={handleSearch} onClear={handleClear} isLoading={isLoading} />
      <div className="flex-1 lg:ml-80"> {/* Memberi ruang untuk sidebar di layar besar */}
        {error && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white p-3 rounded-md shadow-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
        <Map location={location} />
        
      </div>
    </main>
  );
};