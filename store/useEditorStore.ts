// src/store/useEditorStore.ts
import { create } from 'zustand';

export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

interface EditorState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  startTime: number;
  endTime: number;
  currentTime: number;
  subtitles: Subtitle[];
  isProcessing: boolean;
  uploadProgress: number;
  
  // Acciones
  setVideoFile: (file: File) => void;
  setDuration: (duration: number) => void;
  setRange: (start: number, end: number) => void;
  setCurrentTime: (time: number) => void;
  setSubtitles: (subtitles: Subtitle[]) => void;
  updateSubtitleText: (id: string, text: string) => void;
  setProcessing: (isProcessing: boolean, progress?: number) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  videoFile: null,
  videoUrl: null,
  duration: 0,
  startTime: 0,
  endTime: 0,
  currentTime: 0,
  subtitles: [],


  isProcessing: false,
  uploadProgress: 0,

  setVideoFile: (file) => {
    const url = URL.createObjectURL(file);
    set({ videoFile: file, videoUrl: url, startTime: 0, endTime: 0, currentTime: 0 });
  },
  setDuration: (duration) => set({ duration, endTime: duration }),
  setRange: (startTime, endTime) => set({ startTime, endTime }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setSubtitles: (subtitles) => set({ subtitles }),
  updateSubtitleText: (id, text) =>
    set((state) => ({
      subtitles: state.subtitles.map((sub) =>
        sub.id === id ? { ...sub, text } : sub
      ),
    })),
  // Implementación de la nueva acción
  setProcessing: (isProcessing, progress = 0) => 
    set({ isProcessing, uploadProgress: progress }),

  reset: () => set({ 
    videoFile: null, 
    videoUrl: null, 
    duration: 0, 
    startTime: 0, 
    endTime: 0, 
    subtitles: [],
    isProcessing: false,
    uploadProgress: 0
  }),
}));  

  