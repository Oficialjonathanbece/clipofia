// src/components/editor/SubtitleEditor.tsx
'use client';

import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import styles from '@/styles/components/subtitles.module.css';
import { MessageSquareText, Play } from 'lucide-react';

interface SubtitleEditorProps {
  onJumpToTime?: (time: number) => void;
}

export function SubtitleEditor({ onJumpToTime }: SubtitleEditorProps) {
  const { subtitles, currentTime, updateSubtitleText } = useEditorStore();

  // Si no hay subtítulos, cargamos unos datos de ejemplo para visualizar la interfaz (Fase 2 Visual Mock)
  const displaySubtitles = subtitles.length > 0 ? subtitles : [
    { id: '1', startTime: 0.0, endTime: 3.5, text: 'Bienvenidos al creador de clips automáticos.' },
    { id: '2', startTime: 3.5, endTime: 7.0, text: 'Aquí podrás editar cada palabra en tiempo real.' },
    { id: '3', startTime: 7.0, endTime: 12.0, text: 'Los subtítulos se quemarán usando FFmpeg y Whisper.' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerInfo}>
        <span>Sincronización automática con Whisper</span>
        <span>{displaySubtitles.length} bloques</span>
      </div>

      <div className={styles.list}>
        {displaySubtitles.map((sub) => {
          const isActive = currentTime >= sub.startTime && currentTime <= sub.endTime;

          return (
            <div
              key={sub.id}
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
            >
              <div className={styles.meta}>
                <button
                  type="button"
                  className={styles.timeBadge}
                  onClick={() => onJumpToTime && onJumpToTime(sub.startTime)}
                  title="Ir a este segundo en el video"
                >
                  <Play size={10} className="inline mr-1" />
                  {sub.startTime.toFixed(1)}s - {sub.endTime.toFixed(1)}s
                </button>
                <span className="text-[10px] text-zinc-500">Bloque #{sub.id}</span>
              </div>
              <textarea
                value={sub.text}
                onChange={(e) => updateSubtitleText(sub.id, e.target.value)}
                className={styles.textarea}
                rows={2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}