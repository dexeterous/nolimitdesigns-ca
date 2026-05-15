import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import GraphicDesignServices from './pages/GraphicDesignServices';
import VideoDesignServices from './pages/VideoDesignServices';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import ClientDashboard from './pages/ClientDashboard';
import ClientRequests from './pages/ClientRequests';
import ClientSubmitRequest from './pages/ClientSubmitRequest';
import ClientBrands from './pages/ClientBrands';
import ClientRequestDetail from './pages/ClientRequestDetail';
import ClientFiles from './pages/ClientFiles';
import ClientTeam from './pages/ClientTeam';
import ClientNotificationSettings from './pages/ClientNotificationSettings';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';
import IndustryPortfolio from './pages/IndustryPortfolio';
import ServicePage from './pages/ServicePage';
import LocationPage from './pages/LocationPage';
import Contact from './pages/Contact';
import About from './pages/About';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* New Agency Pages */}
            <Route path="/portfolio/:slug" element={<IndustryPortfolio />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/web-design/:slug" element={<LocationPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* Legacy Pages */}
            <Route path="/graphic-design-services" element={<GraphicDesignServices />} />
            <Route path="/video-design-services" element={<VideoDesignServices />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog-posts" element={<Blog />} />
            <Route path="/blog-posts/:slug" element={<BlogPost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* Client Dashboard */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/requests" element={<ClientRequests />} />
            <Route path="/client/requests/:id" element={<ClientRequestDetail />} />
            <Route path="/client/submit-request" element={<ClientSubmitRequest />} />
            <Route path="/client/brands" element={<ClientBrands />} />
            <Route path="/client/files" element={<ClientFiles />} />
            <Route path="/client/team" element={<ClientTeam />} />
            <Route path="/client/notifications" element={<ClientNotificationSettings />} />
            <Route path="/client/*" element={<ClientDashboard />} />
            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;