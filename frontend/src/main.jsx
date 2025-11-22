import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './assets/css/index.css'

// Importação das páginas
import Layout from './components/Layout'
import Home from './pages/Home'
import Agendamento from './pages/Agendamento'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Colaboradores from './pages/Colaboradores'
import Contato from './pages/Contato'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)