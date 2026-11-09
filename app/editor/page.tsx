'use client';

import styles from '@/styles/fase3/editor.module.css';
import { Timeline } from '@/app/components/editor/Timeline';
import { SubtitleEditor } from '@/app/components/editor/SubtitleEditor';
import { useEditorStore } from '@/store/useEditorStore';
import { Film } from 'lucide-react';
import { ProgressBar } from '@/app/components/ui/ProgressBar';

export default function EditorPage() {

  const videoFile = useEditorStore((state) => state.videoFile);
  const videoUrl = videoFile ? URL.createObjectURL(videoFile) : null;
  const isProcessing = useEditorStore((state) => state.isProcessing);
  const uploadProgress = useEditorStore((state) => state.uploadProgress);

  return (
    <div className={styles.editorContainer}>

      <div className={styles.editorGrid}>
        {/* COLUMNA 2: Visualizador central y Timeline */}
        <main className={styles.previewColumn}>
          {isProcessing ? (
            /* Si se está procesando o subiendo el archivo, mostramos tu ProgressBar */
            <div style={{ width: '100%', maxWidth: '320px', padding: '1rem' }}>
              <ProgressBar progress={uploadProgress} label="Procesando archivo de vídeo..." />
            </div>
          ) : videoUrl ? (
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