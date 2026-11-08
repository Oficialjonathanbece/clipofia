// src/components/ui/ProgressBar.tsx
import React from 'react';
import styles from '@/styles/components/progressbar.module.css';

interface ProgressBarProps {
  progress: number; // Valor de 0 a 100
  label?: string;
}

export function ProgressBar({ progress, label = 'Preparando video local...' }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.percentage}>{Math.round(progress)}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}