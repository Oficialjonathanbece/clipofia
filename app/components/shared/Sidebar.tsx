// src/components/shared/Sidebar.tsx
'use client';

import Link from 'next/link';
import { Video, Scissors, CreditCard, FolderOpen } from 'lucide-react';
import styles from '@/styles/shared/sidebar.module.css';
import { useState } from 'react';
import { VideoUploader } from '@/app/components/uploader/VideoUploader'; // Ajusta la ruta absoluta si es necesario

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<'projects' | 'editor' | 'billing'>('projects');

  const menuItems = [
    { id: 'projects', name: 'Mis Proyectos', href: '/dashboard', icon: FolderOpen },
    { id: 'editor', name: 'Nuevo Clip', href: '/editor', icon: Scissors },
    { id: 'billing', name: 'Créditos / Planes', href: '/billing', icon: CreditCard },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandContainer}>
        <Video className={styles.brandIcon} />
        <span className={styles.brandTitle}>ClipoFIA</span>
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navItem}
              onClick={() => setActiveTab(item.id as any)}
            >
              <Icon className={styles.navIcon} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Botón Uploader integrado como acción en el menú */}
        <div className={styles.uploadMenuItem}>
          <VideoUploader />
        </div>
      </nav>

      <div className={styles.footer}>
        Versión MVP 1.0 — Local Mode
      </div>
    </aside>
  );
}