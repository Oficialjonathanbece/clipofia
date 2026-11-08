// src/components/ui/ConfirmModal.tsx
'use client';

import React from 'react';
import { Button } from '@/app/components/ui/Button';
import styles from '@/styles/fase3/modal.module.css';
import { X, Scissors, AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fileName: string;
  startTime: number;
  endTime: number;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  fileName,
  startTime,
  endTime,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const clipDuration = Math.max(0, endTime - startTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Encabezado */}
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={20} className="text-indigo-500" />
            <h3 className={styles.title}>Confirmar Renderizado</h3>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className={styles.body}>
          <p style={{ fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.5 }}>
            Se va a procesar un nuevo corte en relación de aspecto <strong>9:16</strong> utilizando FFmpeg. Revisa los tiempos fijados:
          </p>

          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Archivo origen:</span>
              <span className={styles.summaryValue} style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {fileName}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Tiempo de Inicio:</span>
              <span className={styles.summaryValue}>{formatTime(startTime)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Tiempo de Fin:</span>
              <span className={styles.summaryValue}>{formatTime(endTime)}</span>
            </div>
            <div className={styles.summaryRow} style={{ paddingTop: '0.5rem', borderTop: '1px dashed #27272a' }}>
              <span className={styles.summaryLabel} style={{ color: '#ffffff', fontWeight: 600 }}>Duración del Clip:</span>
              <span className={styles.summaryValue} style={{ color: 'var(--primary, #6366f1)', fontWeight: 700 }}>
                {formatTime(clipDuration)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#71717a' }}>
            <AlertCircle size={14} />
            <span>El proceso se ejecutará localmente en el backend de Python.</span>
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className={styles.footer}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Scissors size={16} /> Iniciar Renderizado
          </Button>
        </div>
      </div>
    </div>
  );
}