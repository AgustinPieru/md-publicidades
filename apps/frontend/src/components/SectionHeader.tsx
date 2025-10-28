import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeader = ({ title, subtitle, align = 'left' }: SectionHeaderProps) => {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 3, md: 4 } }}>
      <Typography
        component="h1"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.2px',
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.4rem' },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}

      <Box
        sx={{
          mt: 2,
          mx: align === 'center' ? 'auto' : 0,
          width: 72,
          height: 4,
          borderRadius: 2,
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      />
    </Box>
  );
};

export default SectionHeader;


