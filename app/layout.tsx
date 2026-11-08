// src/app/layout.tsx
import '@/app/globals.css'; // o tus estilos globales si los tienes
import { Navbar } from '@/app/components/shared/Navbar'; 
import { Sidebar } from '@/app/components/shared/Sidebar';
import type { Metadata } from "next";


export const metadata = {
  title: 'ClipoFia - Editor de Clips',
  description: 'Aplicación para extraer y editar clips de video',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
  
        {/* Contenedor general que divide la pantalla en 2 (Sidebar a la izq y Contenido a la der) */}
        <div className="app-layout">
          
          {/* El Sidebar ahora vive aquí de forma permanente */}
          <Sidebar />
 
        
          {/* Envoltorio derecho que contiene el Navbar y las páginas */}
          <div className="main-content-wrapper">
            <Navbar />
            <main className="main-content">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}