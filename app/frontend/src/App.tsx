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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;