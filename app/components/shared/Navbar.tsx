'use client';

import styles from '/styles/shared/navbar.module.css';
import { HardDrive, User } from 'lucide-react';

interface NavbarProps {
  title?: string;
  userName?: string;
  statusText?: string;
}

export function Navbar({ 
  title = 'Panel de Control', 
  userName = 'Procesamiento Local',
  statusText = 'Modo Local' 
}: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>{statusText}</span> 
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <HardDrive size={18} />
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
}