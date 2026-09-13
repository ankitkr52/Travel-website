import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { seedData } from './lib/seed.ts'
import './styles/globals.css'
import App from './App.tsx'

seedData()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
