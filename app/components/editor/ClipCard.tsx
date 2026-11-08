// src/components/dashboard/ClipCard.tsx
'use client';

import React from 'react';
import { Button } from '@/app/components/ui/Button';
import styles from '@/styles/fase3/clipcard.module.css';
import { Download, Trash2 } from 'lucide-react';

interface ClipCardProps {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  createdAt: string;
  onDownload: (id: string, url: string) => void;
  onDelete: (id: string) => void;
}

export function ClipCard({
  id,
  title,
  videoUrl,
  duration,
  createdAt,
  onDownload,
  onDelete,
}: ClipCardProps) {
  return (
    <div className={styles.card}>
      {/* Previsualización vertical */}
      <div className={styles.previewWrapper}>
        <video src={videoUrl} preload="metadata" className={styles.thumbnailVideo} />
        <span className={styles.durationBadge}>{duration}</span>
      </div>

      {/* Información y Acciones */}
      <div className={styles.content}>
        <div>
          <h4 className={styles.title} title={title}>{title}</h4>
          <span className={styles.meta}>Creado el {createdAt}</span>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="sm"
            style={{ flex: 1 }}
            onClick={() => onDownload(id, videoUrl)}
          >
            <Download size={14} /> Descargar
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(id)}
            title="Eliminar clip"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}