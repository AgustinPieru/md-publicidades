import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar de ruta, forzar que la ventana vuelva al inicio
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;


