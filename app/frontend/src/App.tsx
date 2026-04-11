import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import GraphicDesignServices from './pages/GraphicDesignServices';
import VideoDesignServices from './pages/VideoDesignServices';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Register from './pages/Register';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import ClientRequests from './pages/ClientRequests';
import ClientSubmitRequest from './pages/ClientSubmitRequest';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/graphic-design-services" element={<GraphicDesignServices />} />
          <Route path="/video-design-services" element={<VideoDesignServices />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog-posts" element={<Blog />} />
          <Route path="/blog-posts/:slug" element={<BlogPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/requests" element={<ClientRequests />} />
          <Route path="/client/submit-request" element={<ClientSubmitRequest />} />
          <Route path="/client/*" element={<ClientDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;