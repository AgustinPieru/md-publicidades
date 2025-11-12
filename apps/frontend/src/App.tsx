import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminNews from './pages/AdminNews';
import AdminNewsForm from './pages/AdminNewsForm';
import { useRouteImagePreloader } from './hooks/useRouteImagePreloader';

function App() {
  // Precargar imágenes basándose en la ruta actual
  useRouteImagePreloader();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/novedades" element={<News />} />
          <Route path="/novedades/:id" element={<NewsDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/novedades" element={<AdminNews />} />
          <Route path="/admin/novedades/nueva" element={<AdminNewsForm />} />
          <Route path="/admin/novedades/editar/:id" element={<AdminNewsForm />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;


