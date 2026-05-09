import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import BackgroundCanvas from './components/layout/BackgroundCanvas';
import LoadingScreen from './components/layout/LoadingScreen';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminGuard from './components/AdminGuard';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.includes('/admin');

  return (
    <>
      {!isAdminPath && <LoadingScreen />}
      <BackgroundCanvas />
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 Catch-all within layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Routes - Protected (Shows 404 if not authorized) */}
        <Route 
          path="/admin" 
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          } 
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter basename="/TarekRehan">
          <AppContent />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
