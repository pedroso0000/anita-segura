'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

const mockData = [
  { lat: -23.55052, lng: -46.633308, risco: 'alto' }, // São Paulo
  { lat: -22.9068, lng: -43.1729, risco: 'médio' }, // Rio de Janeiro
  { lat: -30.0346, lng: -51.2177, risco: 'baixo' }, // Porto Alegre
];

const getColor = (risco) => {
  switch (risco) {
    case 'alto': return 'red';
    case 'médio': return 'orange';
    case 'baixo': return 'green';
    default: return 'gray';
  }
};

export default function RiscoMapa() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Aqui entraria a chamada para uma API real de dados estatísticos
    setDados(mockData);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <Card>
        <CardContent className="h-[500px]">
          <MapContainer center={[-23.55052, -46.633308]} zoom={4} scrollWheelZoom={false} className="h-full w-full rounded-2xl">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dados.map((ponto, idx) => (
              <Circle
                key={idx}
                center={[ponto.lat, ponto.lng]}
                radius={15000}
                pathOptions={{ color: getColor(ponto.risco), fillOpacity: 0.4 }}
              />
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
}