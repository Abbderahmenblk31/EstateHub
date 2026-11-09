'use client';

import React, { useState } from 'react';
import { FloorplanRoom } from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';

interface FloorplanExplorerProps {
  rooms: FloorplanRoom[];
  propertyTitle?: string;
}

export function FloorplanExplorer({ rooms, propertyTitle }: FloorplanExplorerProps) {
  const { t, locale } = useLanguage();
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || '');
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <span>📐 Architectural CAD Blueprint</span>
            <span>•</span>
            <span>Interactive Space Layout</span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
            {t.fpTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{t.fpSubtitle}</p>
        </div>

        {propertyTitle && (
          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold self-start sm:self-auto">
            {propertyTitle}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Blueprint Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800 relative shadow-inner overflow-hidden flex items-center justify-center">
          {/* Architectural Grid overlay */}
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none"></div>

          <svg
            viewBox="0 0 400 270"
            className="w-full h-auto max-h-[340px] select-none"
          >
            {/* Outer Perimeter Walls */}
            <rect
              x="10"
              y="10"
              width="380"
              height="250"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              rx="8"
            />

            {/* Interactive Rooms */}
            {rooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id;
              const isHovered = hoveredRoomId === room.id;
              const { x, y, width, height, color } = room.svgCoords;

              return (
                <g
                  key={room.id}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedRoomId(room.id)}
                  onMouseEnter={() => setHoveredRoomId(room.id)}
                  onMouseLeave={() => setHoveredRoomId(null)}
                >
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={isSelected ? `${color || '#38bdf8'}33` : isHovered ? `${color || '#38bdf8'}1a` : '#1e293b66'}
                    stroke={isSelected ? (color || '#38bdf8') : isHovered ? '#94a3b8' : '#475569'}
                    strokeWidth={isSelected ? '3' : '1.5'}
                    strokeDasharray={isSelected ? 'none' : 'none'}
                    rx="4"
                  />

                  {/* Room Label in SVG */}
                  <text
                    x={x + width / 2}
                    y={y + height / 2 - 4}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="pointer-events-none"
                  >
                    {locale === 'ar' ? room.name.ar : room.name.en}
                  </text>

                  <text
                    x={x + width / 2}
                    y={y + height / 2 + 12}
                    textAnchor="middle"
                    fill={isSelected ? '#38bdf8' : '#64748b'}
                    fontSize="10"
                    fontFamily="monospace"
                    className="pointer-events-none"
                  >
                    {room.areaSqM} {t.sqm}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 end-4 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            Scale: 1:100 Metric
          </div>
        </div>

        {/* Selected Room Details Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-3">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              {t.selectedRoom}
            </span>

            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {locale === 'ar' ? selectedRoom.name.ar : selectedRoom.name.en}
              </h4>
              <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                {selectedRoom.areaSqM} {t.sqm}
              </span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
              <div className="flex justify-between">
                <span className="text-slate-500">{t.roomDimensions}</span>
                <span className="font-mono font-semibold">{selectedRoom.dimensions}</span>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {t.keyFeatures}
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {selectedRoom.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Room Selector Chips */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              {locale === 'ar' ? 'اختر قاعة أخرى للمعاينة:' : 'Switch room viewport:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoomId(r.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedRoomId === r.id
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {locale === 'ar' ? r.name.ar : r.name.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
