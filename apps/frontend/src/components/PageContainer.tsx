import { Container, Box } from '@mui/material';
import { PropsWithChildren } from 'react';

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

interface PageContainerProps {
  maxWidth?: MaxWidth;
  compact?: boolean;
  useTopOffset?: boolean;
  reservePx?: number; // alto reservado para header+footer
}

const PageContainer = ({
  children,
  maxWidth = 'lg',
  compact = false,
  useTopOffset = true,
  reservePx = 140,
}: PropsWithChildren<PageContainerProps>) => {
  return (
    <Container maxWidth={maxWidth}>
      <Box
        sx={{
          py: { xs: compact ? 2 : 2, md: compact ? 3 : 3 },
          mt: useTopOffset ? -4 : 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          // Evita superposición con el footer y respeta el safe-area en móviles
          maxHeight: {
            xs: `calc(100svh - ${reservePx}px - env(safe-area-inset-bottom, 0px))`,
            md: `calc(100dvh - ${reservePx}px - env(safe-area-inset-bottom, 0px))`,
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;


