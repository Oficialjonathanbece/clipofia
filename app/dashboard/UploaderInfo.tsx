import Link from 'next/link';
import styles from '@/styles/dashboard/projectsInfo.module.css';

export function ProjectsUploaderInfo() {
  return (
    <div className={styles.projectsSectionContent}>
      {/* Información de Cuota */}
      <div className={styles.quotaInfo}>
        <span>Queda 1 vídeo largo.</span>
        <Link href="/billing" className={styles.quotaLink}>Ver planes</Link>
      </div>

      {/* Tus vídeos recientes */}
      <div className={styles.myVideosContainer}>
        <h3 className={styles.myVideosTitle}>Tus vídeos</h3>
        <div className={styles.videoCardsGrid}>
          
          {/* Tarjeta de Ejemplo 1 */}
          <div className={styles.videoCardItem}>
            <div className={styles.videoCardThumbnail} />
            <div className={styles.videoCardFooter}>
              <span>Hoy</span>
              <span className={styles.badgeWarning}>Caduca en 3 días</span>
            </div>
          </div>

          {/* Tarjeta de Ejemplo 2 */}
          <div className={styles.videoCardItem}>
            <div className={styles.videoCardThumbnail} />
            <div className={styles.videoCardFooter}>
              <span>Demostración</span>
              <span className={styles.badgeInfo}>Video de demo</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}