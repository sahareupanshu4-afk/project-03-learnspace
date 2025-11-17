/**
 * Main Entry Point for Learning Platform Application
 *
 * This file initializes the React application and renders it to the DOM.
 * Uses React 18's new concurrent rendering capabilities with createRoot.
 *
 * Written by: Frontend Development Team
 * Tech Stack: React 18, Vite, CSS3
 */

import { StrictMode } from 'react';        // React's StrictMode for development warnings and checks
import { createRoot } from 'react-dom/client'; // React 18's concurrent rendering API
import './index.css';                      // Global CSS styles and Tailwind imports
import App from './App.jsx';              // Main application component with routing

// Mount the React application to the DOM element with id 'root'
// This is where the app is rendered in index.html
createRoot(document.getElementById('root')).render(
  // StrictMode enables helpful development checks:
  // - Detects potential problems in the application
  // - Warns about deprecated APIs
  // - Checks for non-stable side effects
  // - Helps catch common React mistakes
  <StrictMode>
    <App /> {/* Root component containing all application logic */}
  </StrictMode>,
);
