'use client';

import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  time: string;
  thumbnail?: string;
}

export function MobileAlertMockup() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    setShowPhone(true);

    const demoAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Suspicious Behavior Detected',
        message: 'Loitering near high-value items for 8+ minutes',
        location: 'Store #12 - Aisle 3',
        time: '2 min ago',
      },
      {
        id: '2',
        type: 'warning',
        title: 'Queue Build-up Alert',
        message: '5+ customers waiting at checkout',
        location: 'Store #12 - Front',
        time: '5 min ago',
      },
      {
        id: '3',
        type: 'info',
        title: 'Traffic Peak Detected',
        message: 'Customer count 40% above average',
        location: 'Store #12 - Main Floor',
        time: '12 min ago',
      },
    ];

    // Add alerts with delay
    demoAlerts.forEach((alert, idx) => {
      setTimeout(() => {
        setAlerts(prev => [alert, ...prev]);
      }, (idx + 1) * 1500);
    });
  }, []);

  return (
    <div className="flex justify-center items-center py-12">
      {/* iPhone Mockup */}
      <div
        className={`relative transition-all duration-1000 ${
          showPhone
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Phone Frame */}
        <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

          {/* Screen */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
            {/* Status Bar */}
            <div className="relative z-20 bg-white px-6 pt-8 pb-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-gray-900">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* App Header */}
            <div className="bg-sky-600 px-6 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-bold text-lg">SkyPulse Alerts</h2>
                  <p className="text-sky-100 text-sm">{alerts.length} active alerts</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Alerts List */}
            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">
              {alerts.map((alert, idx) => (
                <AlertCard key={alert.id} alert={alert} index={idx} />
              ))}

              {alerts.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-sm">Waiting for alerts...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pulsing notification badge */}
        {alerts.length > 0 && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
            {alerts.length}
          </div>
        )}
      </div>
    </div>
  );
}

function AlertCard({ alert, index }: { alert: Alert; index: number }) {
  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'bg-red-500',
          text: 'text-red-900',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: 'bg-yellow-500',
          text: 'text-yellow-900',
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'bg-blue-500',
          text: 'text-blue-900',
        };
    }
  };

  const style = getAlertStyle(alert.type);

  return (
    <div
      className={`${style.bg} border-2 rounded-lg p-3 shadow-sm animate-slide-in-right`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 ${style.icon} rounded-full flex items-center justify-center`}>
          {alert.type === 'critical' ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : alert.type === 'warning' ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm ${style.text}`}>
            {alert.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {alert.message}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{alert.location}</span>
            <span>•</span>
            <span>{alert.time}</span>
          </div>
        </div>

        {/* Action */}
        <button className="flex-shrink-0 text-sky-600 text-xs font-semibold">
          View
        </button>
      </div>
    </div>
  );
}

// Add to globals.css:
/*
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.4s ease-out forwards;
}
*/
