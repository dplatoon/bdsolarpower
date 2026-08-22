import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root) {
  // Prerendered routes ship server-rendered markup — hydrate instead of remounting.
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}
