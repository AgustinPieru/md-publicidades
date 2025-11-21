import { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, prefix = '+' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const startValue = 0;

    // Función de easing para una animación suave (ease-out)
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Aplicar easing
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.floor(startValue + (end - startValue) * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Asegurar que llegue exactamente al valor final
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <Box ref={elementRef}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 800 }}>
        {prefix}{count.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default AnimatedCounter;

