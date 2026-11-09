// src/components/ui/ProgressBar.tsx
import React from 'react';
import styles from '@/styles/components/progressbar.module.css';

interface ProgressBarProps {
  progress: number; // Valor de 0 a 100
  label?: string;
  isModal?: boolean; // Si es true, se renderiza como modal flotante global
}

export function ProgressBar({ 
  progress, 
  label = 'Procesando vídeo local con FFmpeg...', 
  isModal = true 
}: ProgressBarProps) {
  // Aseguramos que el progreso esté siempre entre 0 y 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const content = (
    <div className={`${styles.container} ${isModal ? styles.modalContainer : ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.percentage}>{Math.round(clampedProgress)}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${clampedProgress}%` }} />
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className={styles.overlay}>
        {content}
      </div>
    );
  }

  return content;
}