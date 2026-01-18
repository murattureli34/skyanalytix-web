'use client';

import { useEffect, useState } from 'react';

interface HeatmapZone {
  x: number;
  y: number;
  intensity: number; // 0-100
  label: string;
}

export function HeatmapMockup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const zones: HeatmapZone[] = [
    { x: 20, y: 30, intensity: 85, label: 'Checkout' },
    { x: 60, y: 25, intensity: 65, label: 'Electronics' },
    { x: 35, y: 55, intensity: 45, label: 'Cosmetics' },
    { x: 70, y: 60, intensity: 90, label: 'Entrance' },
    { x: 15, y: 75, intensity: 30, label: 'Storage' },
  ];

  const getHeatColor = (intensity: number) => {
    if (intensity > 70) return 'from-red-500/80 to-orange-500/80';
    if (intensity > 40) return 'from-yellow-500/80 to-orange-500/80';
    return 'from-green-500/80 to-yellow-500/80';
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Store Layout Background */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-300">
        <div className="aspect-video relative">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
            <svg className="w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Store sections */}
          <div className="absolute inset-0 p-8">
            {/* Entrance */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-sky-400 rounded-b-lg">
              <div className="text-xs text-center text-white font-semibold mt-1">Entrance</div>
            </div>

            {/* Checkout counters */}
            <div className="absolute top-1/4 left-4 space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-24 h-16 bg-gray-400 rounded border-2 border-gray-500" />
              ))}
            </div>

            {/* Shelving units */}
            <div className="absolute top-1/3 right-8 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-40 h-12 bg-gray-300 rounded" />
              ))}
            </div>
          </div>

          {/* Heatmap Zones */}
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transitionDelay: `${idx * 200}ms`,
              }}
            >
              {/* Pulsing circle */}
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${getHeatColor(
                    zone.intensity
                  )} animate-pulse-slow blur-xl`}
                />
                <div
                  className={`absolute inset-0 w-24 h-24 rounded-full border-4 ${
                    zone.intensity > 70
                      ? 'border-red-500'
                      : zone.intensity > 40
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  } animate-ping-slow`}
                />
              </div>

              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-gray-900/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {zone.label}: {zone.intensity}%
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg p-3 shadow-lg">
            <div className="text-xs font-semibold text-gray-700 mb-2">Traffic Intensity</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-orange-500" />
                <span className="text-xs text-gray-600">High (70-100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-orange-500" />
                <span className="text-xs text-gray-600">Medium (40-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-yellow-500" />
                <span className="text-xs text-gray-600">Low (0-40%)</span>
              </div>
            </div>
          </div>

          {/* Info Badge */}
          <div className="absolute top-4 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="text-xs font-semibold">Live Heatmap Analysis</div>
            <div className="text-xs opacity-90">Updated every 5 minutes</div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Real-time customer flow analysis helps optimize store layout and staff allocation
        </p>
      </div>
    </div>
  );
}

// Add to tailwind.config.js:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
}
*/
