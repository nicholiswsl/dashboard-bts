'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix untuk ikon default Leaflet yang sering rusak saat di-bundle dengan Next.js
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

// Komponen kecil untuk mengubah view peta secara dinamis
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function Map({ location }) {
  // Posisi default peta (Jakarta, Indonesia)
  const defaultPosition = [-6.2088, 106.8456];
  const position = location ? [location.lat, location.lon] : defaultPosition;
  const zoom = location ? 16 : 10;

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} className="z-0">
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && (
        <Marker position={position}>
           <Popup>
            <div className="space-y-1 text-sm">
              <p className="font-bold text-base">Lokasi Ditemukan!</p>
              <p><b>Alamat:</b> {location.address || 'Tidak tersedia'}<br/>
              <b>Koordinat:</b> {location.lat},{location.lon}</p>
              <p><b>Akurasi:</b> {location.accuracy} meter.</p>
              <a 
                href={`https://www.google.com/maps?q=${location.lat},${location.lon}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-semibold pt-2 block"
              >
                Lihat di Google Maps &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
