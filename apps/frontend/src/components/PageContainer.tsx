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
          minHeight: {
            xs: `calc(100vh - 56px + 1px)`,
            sm: `calc(100vh - 64px + 1px)`,
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;


