import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Scissors, Video } from 'lucide-react';
import styles from '@/styles/home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.headerGroup}>
        <Video className={styles.brandIcon} />
        <h1 className={styles.title}>ClipoFia</h1>
      </div>
      
      <p className={styles.description}>
        La herramienta para recortar, editar y subtitular tus videos locales de forma rápida y profesional.
      </p>

      <Link href="/editor">
        <Button variant="primary" size="lg">
          <Scissors size={20} /> Ir al Editor de Clips
        </Button>
      </Link>
    </div>
  );
}