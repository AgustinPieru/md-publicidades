import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OptimizedImage from './OptimizedImage';

interface ClientCarouselProps {
  logos: readonly string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  logos,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || logos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, logos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  };

  if (logos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          Próximamente: Logos de nuestros clientes
        </Typography>
      </Box>
    );
  }

  // Calcular cuántos logos mostrar según el tamaño de pantalla
  const getVisibleCount = () => {
    if (logos.length === 0) return 0;
    if (logos.length <= 2) return logos.length;
    return 5; // Mostrar 4 logos a la vez en pantallas grandes
  };

  const visibleCount = getVisibleCount();
  const visibleLogos = logos.slice(currentIndex, currentIndex + visibleCount);
  
  // Si no hay suficientes logos al final, agregar del inicio
  if (visibleLogos.length < visibleCount && logos.length > visibleCount) {
    const remaining = visibleCount - visibleLogos.length;
    visibleLogos.push(...logos.slice(0, remaining));
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        py: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {logos.length > visibleCount && (
          <IconButton
            onClick={handlePrev}
            sx={{
              color: 'primary.main',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
            aria-label="Anterior"
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 120,
            gap: { xs: 2, sm: 3, md: 4 },
            flexWrap: 'wrap',
          }}
        >
          {visibleLogos.map((logo, index) => {
            const actualIndex = (currentIndex + index) % logos.length;
            return (
              <Box
                key={`${actualIndex}-${index}`}
                sx={{
                  opacity: 1,
                  transition: 'all 0.3s ease-in-out',
                  width: { xs: 100, sm: 120, md: 150 },
                  height: { xs: 60, sm: 70, md: 90 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <OptimizedImage
                  src={logo}
                  alt={`Cliente ${actualIndex + 1}`}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  showSkeleton={true}
                  skeletonHeight={90}
                />
              </Box>
            );
          })}
        </Box>

        {logos.length > visibleCount && (
          <IconButton
            onClick={handleNext}
            sx={{
              color: 'primary.main',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
            aria-label="Siguiente"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>

      {/* Indicadores */}
      {logos.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          {logos.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  index === currentIndex ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ClientCarousel;

