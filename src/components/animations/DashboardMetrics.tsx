'use client';

import { useEffect, useState, useRef } from 'react';

interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  icon: string;
  color: string;
}

export function DashboardMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics: Metric[] = [
    {
      label: 'Shrink Reduction',
      value: 40,
      unit: '%',
      trend: 'down',
      trendValue: 12,
      icon: '📉',
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Investigation Time Saved',
      value: 15,
      unit: 'hrs/month',
      trend: 'up',
      trendValue: 8,
      icon: '⏱️',
      color: 'from-sky-500 to-blue-600',
    },
    {
      label: 'Incidents Prevented',
      value: 127,
      unit: 'this month',
      trend: 'up',
      trendValue: 23,
      icon: '🛡️',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      label: 'ROI Timeline',
      value: 28,
      unit: 'days',
      trend: 'neutral',
      trendValue: 0,
      icon: '💰',
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            metric={metric}
            index={idx}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  metric,
  index,
  isVisible,
}: {
  metric: Metric;
  index: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = metric.value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, metric.value]);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 rounded-2xl`}
      />

      {/* Icon */}
      <div className="text-4xl mb-4">{metric.icon}</div>

      {/* Value */}
      <div className="relative">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
            {count}
          </span>
          <span className="text-2xl font-semibold text-gray-600">
            {metric.unit.split('/')[0]}
          </span>
        </div>
        {metric.unit.includes('/') && (
          <div className="text-sm text-gray-500 mt-1">
            {metric.unit.split('/')[1]}
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mt-4 text-sm font-semibold text-gray-700">
        {metric.label}
      </div>

      {/* Trend */}
      {metric.trend !== 'neutral' && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              metric.trend === 'up'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {metric.trend === 'up' ? '↑' : '↓'}
            <span>{metric.trendValue}%</span>
          </div>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 hover:opacity-10 transition-opacity duration-300`} />
      </div>
    </div>
  );
}

// Simplified version for smaller screens
export function CompactMetrics() {
  return (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      {[
        { value: '40%', label: 'Shrink ↓' },
        { value: '15hrs', label: 'Time Saved' },
        { value: '127', label: 'Prevented' },
        { value: '<30d', label: 'ROI' },
      ].map((metric, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 text-center border-2 border-sky-100"
        >
          <div className="text-3xl font-bold text-sky-600">{metric.value}</div>
          <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
