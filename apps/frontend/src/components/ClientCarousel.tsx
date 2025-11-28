import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OptimizedImage from './OptimizedImage';

interface ClientCarouselProps {
  logos: readonly string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  /** 
   * Cuando es true, los logos se muestran siempre a color (sin filtro en escala de grises).
   * Útil, por ejemplo, para los aliados estratégicos.
   */
  colored?: boolean;
  /**
   * Permite forzar cuántos logos se muestran a la vez en el carrusel.
   * Si se establece, tiene prioridad sobre el cálculo automático según el breakpoint.
   */
  visibleCountOverride?: number;
  /**
   * Número de columnas en desktop (md+) para la grilla de logos.
   * Por defecto son 6 columnas; se puede ajustar, por ejemplo, a 5 para tener 3 filas de 5.
   */
  desktopColumnsOverride?: number;
}

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  logos,
  autoPlay = true,
  autoPlayInterval = 3000,
  colored = false,
  visibleCountOverride,
  desktopColumnsOverride,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || logos.length === 0) return;

    // Solo auto-play cuando hay más logos que los que se pueden mostrar a la vez
    const maxVisible = getVisibleCount();
    if (logos.length <= maxVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, logos.length, isMobile, isTablet, visibleCountOverride]);

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
    if (visibleCountOverride) return Math.min(visibleCountOverride, logos.length);
    if (isMobile) return 9; // Móvil: 3 filas de 3 logos (9 en total)
    if (isTablet) return 9; // Tablet: también 3x3 logos
    return 18; // Desktop: 3 filas de 6 logos (18 en total)
  };

  const visibleCount = getVisibleCount();
  const desktopColumns = desktopColumnsOverride ?? 6;

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
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)', // 3 columnas en mobile
              sm: 'repeat(3, 1fr)', // 3 columnas en tablet
              md: `repeat(${desktopColumns}, 1fr)`, // columnas configurables en desktop
            },
            alignItems: 'center',
            justifyItems: 'center',
            minHeight: { xs: 180, sm: 140, md: 160 },
            gap: { xs: 2, sm: 2.5, md: 3.5 },
          }}
        >
          {visibleLogos.map((logo, index) => {
            const actualIndex = (currentIndex + index) % logos.length;
            return (
              <Box
                key={actualIndex}
                sx={{
                  opacity: 1,
                  transition: 'all 0.3s ease-in-out',
                  width: '100%',
                  height: { xs: 60, sm: 70, md: 80 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: colored ? 'none' : 'grayscale(100%)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: colored ? 'none' : 'grayscale(0%)',
                  },
                }}
              >
                <OptimizedImage
                  src={logo}
                  alt={`Cliente ${actualIndex + 1}`}
                  imageSx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  showSkeleton={false}
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

    </Box>
  );
};

export default ClientCarousel;

