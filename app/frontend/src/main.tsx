import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadRuntimeConfig } from './lib/config.ts';

const rootElement = document.getElementById('root')!;
rootElement.innerHTML = `
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fff6ec;">
    <div style="height:56px;width:56px;border-radius:9999px;border:4px solid rgba(16,16,16,.14);border-top-color:#ff4f01;animation:nolimit-spin .8s linear infinite;"></div>
    <style>@keyframes nolimit-spin{to{transform:rotate(360deg)}}</style>
  </div>
`;

// Load runtime configuration before rendering the app
async function initializeApp() {
  try {
    await loadRuntimeConfig();
    console.log('Runtime configuration loaded successfully');
  } catch (error) {
    console.warn(
      'Failed to load runtime configuration, using defaults:',
      error
    );
  }

  // Render the app
  createRoot(rootElement).render(<App />);
}

// Initialize the app
initializeApp();
