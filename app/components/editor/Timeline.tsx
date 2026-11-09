// src/components/editor/Timeline.tsx
'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { Button } from '@/app/components/ui/Button';
import styles from '@/styles/components/timeline.module.css';
import { Clock, Scissors } from 'lucide-react';

export function Timeline() {
  const { duration, startTime, endTime, currentTime, setRange, videoFile } = useEditorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const clipDuration = Math.max(0, endTime - startTime);
  const startPercent = duration ? (startTime / duration) * 100 : 0;
  const widthPercent = duration ? (clipDuration / duration) * 100 : 0;

  const handleStartRendering = () => {
    console.log(`Renderizando clip de ${startTime}s a ${endTime}s`);
  };

  return (
    <div className={styles.container}>
      {/* Cabecera con tiempo recortado y botón de procesar integrado */}
      <div className={styles.header}>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span className={styles.title}>Línea de Tiempo del Clip</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className={styles.timeInfo}>
            Duración del fragmento: {formatTime(clipDuration)}
          </span>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
            disabled={!videoFile}
          >
            <Scissors size={14} /> Procesar Clip
          </Button>
        </div>
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

      {/* Modal de confirmación integrado en el flujo de la timeline */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStartRendering}
        fileName={videoFile ? videoFile.name : 'video_local.mp4'}
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
}