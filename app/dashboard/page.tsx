// src/app/(dashboard)/page.tsx
'use client';

import React, { useState } from 'react';
import { ClipCard } from '@/app/components/editor/ClipCard';
import { Card } from '@/app/components/ui/Card';
import { Film, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { ProjectsUploaderInfo } from '@/app/dashboard/UploaderInfo';
import styles from '@/styles/dashboard.module.css';


export default function DashboardPage() {
  // Estado de ejemplo para los clips exportados
  const [clips, setClips] = useState([
    {
      id: '1',
      title: 'Clip_Destacado_01.mp4',
      videoUrl: '',
      duration: '00:35',
      createdAt: 'Hoy, 16:20',
    },
    {
      id: '2',
      title: 'Reel_Tutorial_Python.mp4',
      videoUrl: '',
      duration: '00:58',
      createdAt: 'Ayer, 14:10',
    },
  ]);

  const handleDelete = (id: string) => {
    setClips(clips.filter((clip) => clip.id !== id));
  };

  const handleDownload = (id: string, url: string) => {
    alert(`Iniciando descarga del clip #${id}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Cabecera de la página */}
      <div className={styles.headerRow}>
       
        <div>
          <h1 className={styles.title}>Mis Clips Exportados</h1>
          <p className={styles.subtitle}>Gestiona, descarga o elimina tus videos procesados en 9:16.</p>
        </div>
        <Link href="/editor">
          <Button variant="primary" size="md">
            <Plus size={16} /> Nuevo Editor
          </Button>
        </Link>
      </div>

      {/* Listado de clips o estado vacío */}
      {clips.length === 0 ? (
        <Card>
          <div className={styles.emptyCardContent}>
            <Film size={48} className={styles.emptyIcon} />
            <p>No tienes clips exportados todavía.</p>
          </div>
        </Card>
      ) : (
        <div className={styles.clipsGrid}>
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              {...clip}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Sección informativa y vídeos recientes */}
      <ProjectsUploaderInfo />
    </div>
  );
}