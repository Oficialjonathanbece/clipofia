'use client';

import styles from '@/styles/fase3/editor.module.css';
import { Sidebar } from '@/app/components/shared/Sidebar';
import { VideoUploader } from '@/app/components/uploader/VideoUploader';
import { Timeline } from '@/app/components/editor/Timeline';
import { SubtitleEditor } from '@/app/components/editor/SubtitleEditor';
import { ClipCard } from '@/app/components/editor/ClipCard';
import { useEditorStore } from '@/store/useEditorStore'; // 1. Importas tu store
import { Film } from 'lucide-react';

export default function EditorPage() {

  const videoFile = useEditorStore((state) => state.videoFile);
  const videoUrl = videoFile ? URL.createObjectURL(videoFile) : null;

  return (
    <div className={styles.editorContainer}>
      {/* Navbar superior del editor */}
    
      {/* Contenedor de 3 columnas */}
      <div className={styles.editorGrid}>
        
        {/* COLUMNA 1: Sidebar de navegación y carga de archivos */}
        <aside className={styles.sidebarColumn}>
          <div className={styles.panel}>
            <h3>Clips Generados</h3>
            <ClipCard/> 
          </div>
        </aside>

        {/* COLUMNA 2: Visualizador central y Timeline */}
        <main className={styles.previewColumn}>
          {videoUrl ? (
            /* Si ya se subió un vídeo, mostramos el reproductor */
            <video 
              src={videoUrl} 
              controls 
              className={styles.videoPlayer} 
            />
          ) : (
            /* Si no hay vídeo, mostramos el estado vacío elegante */
            <div className={styles.emptyPreview}>
              <Film size={48} className={styles.emptyIcon} />
              <span>Sube un vídeo desde el menú lateral para comenzar</span>
              </div>
          )}
        </main>

        {/* COLUMNA 3: Subtítulos y Gestión de Clips */}
        <aside className={styles.toolsColumn}>
          <div className={styles.panel}>
            <h3>Subtitulos Generados</h3>  
            <SubtitleEditor />
          </div>
        </aside>


        {/* FILA INFERIOR COMPLETA (OCUPA LAS 3 COLUMNAS): La Línea de Tiempo */}
        <section className={styles.timelineRow}>
           <Timeline /> 
        </section>

      </div>
    </div>
  );
}