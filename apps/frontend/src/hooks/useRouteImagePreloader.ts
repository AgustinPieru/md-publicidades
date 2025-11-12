import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { images } from '../constants/images';
import { preloadImage } from './useImagePreloader';

/**
 * Hook que precarga imágenes basándose en la ruta actual
 * Esto ayuda a precargar imágenes de páginas relacionadas cuando el usuario navega
 */
export const useRouteImagePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    // Precargar imágenes basándose en la ruta actual
    const routeImages: Record<string, string[]> = {
      '/': [images.cover, images.logo, images.logoHorizontal],
      '/sobre-nosotros': [images.about, images.logo, images.logoHorizontal],
      '/servicios': [
        ...images.services.led,
        ...images.services.monocolumnas,
        ...images.services.ruteros,
        images.logo,
        images.logoHorizontal,
      ],
      '/novedades': [images.logo, images.logoHorizontal],
      '/contacto': [images.logo, images.logoHorizontal],
    };

    const imagesToPreload = routeImages[location.pathname] || [images.logo, images.logoHorizontal];

    // Precargar imágenes de la ruta actual y rutas relacionadas
    imagesToPreload.forEach((imageUrl) => {
      preloadImage(imageUrl).catch(() => {
        // Silenciar errores de precarga
      });
    });

    // También precargar imágenes de rutas relacionadas cuando sea apropiado
    if (location.pathname === '/') {
      // Si estamos en home, precargar about y servicios
      preloadImage(images.about).catch(() => {});
      images.services.led.forEach((url) => preloadImage(url).catch(() => {}));
      images.services.monocolumnas.forEach((url) => preloadImage(url).catch(() => {}));
      images.services.ruteros.forEach((url) => preloadImage(url).catch(() => {}));
    }
  }, [location.pathname]);
};

