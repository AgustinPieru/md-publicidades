import React, { useEffect } from 'react';
import { Dialog, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface LightboxProps {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ open, src, alt, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (event.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={{ '& .MuiDialog-paper': { backgroundColor: 'rgba(0,0,0,0.9)' } }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, color: 'common.white', zIndex: 1 }} aria-label="Cerrar">
          <CloseIcon />
        </IconButton>

        {onPrev && (
          <IconButton onClick={onPrev} sx={{ position: 'absolute', left: 16, color: 'common.white', zIndex: 1 }} aria-label="Anterior">
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        {onNext && (
          <IconButton onClick={onNext} sx={{ position: 'absolute', right: 16, color: 'common.white', zIndex: 1 }} aria-label="Siguiente">
            <ArrowForwardIosIcon />
          </IconButton>
        )}

        <Box component="img" src={src} alt={alt} sx={{ maxWidth: '95%', maxHeight: '85%', objectFit: 'contain', borderRadius: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }} />
      </Box>
    </Dialog>
  );
};

export default Lightbox;


