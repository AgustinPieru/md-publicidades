import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
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
    if (isMobile) return 2; // Móvil: 2 logos
    if (isTablet) return 3; // Tablet: 3 logos
    return 5; // Desktop: 5 logos
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
          gap: { xs: 0.5, sm: 1, md: 2 },
          overflow: 'hidden',
          px: { xs: 1, sm: 2 },
        }}
      >
        {logos.length > visibleCount && (
          <IconButton
            onClick={handlePrev}
            sx={{
              color: 'primary.main',
              '&:hover': { backgroundColor: 'action.hover' },
              display: { xs: 'none', sm: 'flex' },
              minWidth: { xs: 32, sm: 40 },
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
            aria-label="Anterior"
          >
            <ArrowBackIosIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
          </IconButton>
        )}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 80, sm: 100, md: 120 },
            gap: { xs: 1.5, sm: 2, md: 3 },
            flexWrap: { xs: 'nowrap', sm: 'wrap' },
            overflowX: { xs: 'auto', sm: 'visible' },
            overflowY: 'hidden',
            scrollSnapType: { xs: 'x mandatory', sm: 'none' },
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
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
                  width: { xs: 80, sm: 90, md: 110 },
                  height: { xs: 50, sm: 55, md: 65 },
                  minWidth: { xs: 80, sm: 90, md: 110 },
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'grayscale(100%)',
                  scrollSnapAlign: { xs: 'center', sm: 'none' },
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'grayscale(0%)',
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
                  skeletonHeight={65}
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
              display: { xs: 'none', sm: 'flex' },
              minWidth: { xs: 32, sm: 40 },
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
            aria-label="Siguiente"
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
          </IconButton>
        )}
      </Box>

      {/* Indicadores */}
      {logos.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 0.75, sm: 1 },
            mt: { xs: 1.5, sm: 2 },
            flexWrap: 'wrap',
          }}
        >
          {logos.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: { xs: 6, sm: 8 },
                height: { xs: 6, sm: 8 },
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

