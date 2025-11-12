import React, { useState, useEffect } from 'react';
import { Box, Skeleton, BoxProps } from '@mui/material';
import { preloadImage } from '../hooks/useImagePreloader';

interface OptimizedImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonHeight?: number | string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Componente de imagen optimizado con precarga y estados de carga
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  skeletonHeight = '100%',
  onLoad,
  onError,
  sx,
  ...boxProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    // Precargar la imagen cuando cambia el src
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);

    preloadImage(src)
      .then(() => {
        setIsLoading(false);
        onLoad?.();
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
        if (fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
        onError?.();
      });
  }, [src, fallbackSrc, onLoad, onError]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx,
      }}
      {...boxProps}
    >
      {isLoading && showSkeleton && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={skeletonHeight}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      <Box
        component="img"
        src={imageSrc}
        alt={alt}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          if (fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
          onError?.();
        }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...(hasError && {
            backgroundColor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }),
        }}
      />
    </Box>
  );
};

export default OptimizedImage;

