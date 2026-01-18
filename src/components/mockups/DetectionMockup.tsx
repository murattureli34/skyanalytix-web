'use client';

import { useEffect, useState } from 'react';

interface Detection {
  id: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  label: string;
  confidence: number; // 0-100
  type: 'person' | 'loitering' | 'suspicious' | 'normal';
}

export function DetectionMockup() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate detections appearing over time
    const initialDetections: Detection[] = [
      {
        id: '1',
        x: 25,
        y: 35,
        width: 12,
        height: 25,
        label: 'Person',
        confidence: 94,
        type: 'normal',
      },
      {
        id: '2',
        x: 60,
        y: 40,
        width: 10,
        height: 22,
        label: 'Loitering Detected',
        confidence: 87,
        type: 'loitering',
      },
      {
        id: '3',
        x: 45,
        y: 50,
        width: 11,
        height: 20,
        label: 'Suspicious Behavior',
        confidence: 78,
        type: 'suspicious',
      },
    ];

    // Add detections with delay
    initialDetections.forEach((detection, idx) => {
      setTimeout(() => {
        setDetections(prev => [...prev, detection]);
      }, idx * 800);
    });

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBoxColor = (type: Detection['type']) => {
    switch (type) {
      case 'suspicious':
        return 'border-red-500 bg-red-500/10';
      case 'loitering':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'person':
      case 'normal':
        return 'border-green-500 bg-green-500/10';
    }
  };

  const getAlertColor = (type: Detection['type']) => {
    switch (type) {
      case 'suspicious':
        return 'bg-red-500';
      case 'loitering':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Camera Feed Mockup */}
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700">
        <div className="aspect-video relative bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Simulated store interior */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/30 to-gray-900/50" />
            
            {/* Simulated shelves */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-700/40 to-transparent" />
          </div>

          {/* Detection Boxes */}
          {detections.map((detection, idx) => (
            <div
              key={detection.id}
              className={`absolute transition-all duration-500 ${
                getBoxColor(detection.type)
              } border-2 animate-detection-scan`}
              style={{
                left: `${detection.x}%`,
                top: `${detection.y}%`,
                width: `${detection.width}%`,
                height: `${detection.height}%`,
                animationDelay: `${idx * 200}ms`,
              }}
            >
              {/* Label */}
              <div
                className={`absolute -top-7 left-0 ${getAlertColor(
                  detection.type
                )} text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap flex items-center gap-1`}
              >
                <span>{detection.label}</span>
                <span className="opacity-75">{detection.confidence}%</span>
              </div>

              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current" />
            </div>
          ))}

          {/* Camera Info Overlay */}
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-xs font-mono">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>CAM-01 | Aisle 3</span>
            </div>
            <div className="opacity-75">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Detections Count */}
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded">
            <div className="text-xs font-semibold mb-1">Active Detections</div>
            <div className="text-2xl font-bold">{detections.length}</div>
          </div>

          {/* Alert Panel */}
          {detections.some(d => d.type === 'suspicious' || d.type === 'loitering') && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 border-2 border-red-500 rounded-lg p-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">
                    Suspicious Activity Detected
                  </div>
                  <div className="text-red-200 text-xs mt-1">
                    {detections.filter(d => d.type === 'suspicious').length} alert(s) require attention
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="px-4 py-2 bg-white text-red-900 rounded font-semibold text-sm hover:bg-red-50 transition">
                    Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Detection Accuracy</div>
          <div className="text-2xl font-bold text-sky-600">94%</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Response Time</div>
          <div className="text-2xl font-bold text-green-600">&lt;2s</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">False Positives</div>
          <div className="text-2xl font-bold text-gray-700">&lt;5%</div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Real-time AI detection identifies suspicious behavior patterns before incidents occur
        </p>
      </div>
    </div>
  );
}

// Add to globals.css:
/*
@keyframes detection-scan {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-detection-scan {
  animation: detection-scan 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out forwards;
}
*/
