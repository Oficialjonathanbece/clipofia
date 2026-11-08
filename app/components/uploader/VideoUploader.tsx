'use client';

import React, { useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import styles from '@/styles/components/uploader.module.css';
import { CloudUpload } from 'lucide-react';

export function VideoUploader() {
  const setVideoFile = useEditorStore((state) => state.setVideoFile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploaderContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/mov,video/webm"
        style={{ display: 'none' }}
      />
      <button type="button" className={styles.uploadButton} onClick={handleClick}>
        <CloudUpload size={18} />
        <span>Cargar vídeo</span>
      </button>
    </div>
  );
}