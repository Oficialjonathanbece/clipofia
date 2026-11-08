// src/components/ui/Slider.tsx
import React from 'react';
import styles from '@/styles/Componentes/slider.module.css';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  unit = 's',
  onChange,
}: SliderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={styles.rangeInput}
      />
    </div>
  );
}