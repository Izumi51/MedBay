import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext';
import './assets/css/index.css'

// Importação das páginas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Layout from './components/Layout'
import Home from './pages/Home'
import Agendamento from './pages/Agendamento'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Colaboradores from './pages/Colaboradores'
import Contato from './pages/Contato'
import MinhasConsultas from './pages/MinhasConsultas';
import DashboardMedico from './pages/DashboardMedico';
import Perfil from './pages/Perfil';
import CadastroMedico from './pages/CadastroMedico';
import Relatorios from './pages/Relatorios'
import Recepcao from './pages/Recepcao';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route index element={<Home />} />
            <Route path="agendamento" element={<Agendamento />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="colaboradores" element={<Colaboradores />} />
            <Route path="contato" element={<Contato />} />
            <Route path="minhas-consultas" element={<MinhasConsultas />} />
            <Route path="/area-medico" element={<DashboardMedico />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastro-medico" element={<CadastroMedico />} />
            <Route path="/recepcao" element={<Recepcao />} />
            <Route path="/relatorios" element={<Relatorios />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)