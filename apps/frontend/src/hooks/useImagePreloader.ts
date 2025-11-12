import { useEffect, useState } from 'react';

/**
 * Hook para precargar imágenes y verificar su estado de carga
 */
export const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const loaded = new Set<string>();
    const failed = new Set<string>();

    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          if (isMounted) {
            loaded.add(url);
            setLoadedImages(new Set(loaded));
          }
          resolve();
        };
        
        img.onerror = () => {
          if (isMounted) {
            failed.add(url);
            setFailedImages(new Set(failed));
          }
          reject(new Error(`Failed to load image: ${url}`));
        };
        
        img.src = url;
      });
    };

    const preloadAll = async () => {
      try {
        await Promise.allSettled(imageUrls.map(url => preloadImage(url)));
      } catch (error) {
        console.error('Error precargando imágenes:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    preloadAll();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return {
    loadedImages,
    failedImages,
    isLoading,
    allLoaded: loadedImages.size === imageUrls.length && !isLoading,
  };
};

/**
 * Función utilitaria para precargar una imagen individual
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

