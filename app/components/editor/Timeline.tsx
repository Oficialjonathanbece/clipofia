// src/components/editor/Timeline.tsx
'use client';

import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import styles from '@/styles/components/timeline.module.css';
import { Clock } from 'lucide-react';

export function Timeline() {
  const { duration, startTime, endTime, currentTime, setRange } = useEditorStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const clipDuration = Math.max(0, endTime - startTime);
  const startPercent = duration ? (startTime / duration) * 100 : 0;
  const widthPercent = duration ? (clipDuration / duration) * 100 : 0;

  return (
    <div className={styles.container}>
      {/* Cabecera con tiempo recortado */}
      <div className={styles.header}>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span className={styles.title}>Línea de Tiempo del Clip</span>
        </div>
        <span className={styles.timeInfo}>
          Duración del fragmento: {formatTime(clipDuration)}
        </span>
      </div>

      {/* Pista visual con rango de selección */}
      <div className={styles.timelineTrackContainer}>
        {/* Regla de marcas de fondo */}
        <div className={styles.ruler}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.rulerTick} />
          ))}
        </div>

        {/* Zona coloreada del fragmento activo */}
        <div
          className={styles.selectionRange}
          style={{
            left: `${startPercent}%`,
            width: `${widthPercent}%`,
          }}
        />
      </div>

      {/* Sliders numéricos de ajuste fino */}
      <div className={styles.controlsWrapper}>
        <div className={styles.sliderRow}>
          <span className={styles.sliderLabel}>Inicio ({formatTime(startTime)})</span>
          <input
            type="range"
            min={0}
            max={endTime || duration || 100}
            step={0.1}
            value={startTime}
            onChange={(e) => setRange(parseFloat(e.target.value), endTime)}
            className={styles.rangeInput}
          />
        </div>

        <div className={styles.sliderRow}>
          <span className={styles.sliderLabel}>Fin ({formatTime(endTime)})</span>
          <input
            type="range"
            min={startTime}
            max={duration || 100}
            step={0.1}
            value={endTime}
            onChange={(e) => setRange(startTime, parseFloat(e.target.value))}
            className={styles.rangeInput}
          />
        </div>
      </div>
    </div>
  );
}