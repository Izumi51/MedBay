import { Outlet, Link, useLocation } from 'react-router';
import { Phone, Clock, MapPin, Search, Facebook, Linkedin, Instagram, Send } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, LogIn } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path ? "text-[#159eec]" : "text-white hover:text-[#159eec]";

  return (
    <header>
      {/* Barra Superior de Informações */}
      <div className="bg-white py-2 text-xs text-[#1f2b6c] font-medium hidden md:block">
        <div className="container mx-auto flex justify-between px-4 lg:px-20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-[#1f2b6c]">MED<span className="text-[#159eec]">BAY</span></span>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#159eec]" />
              <div>
                <p>EMERGÊNCIA</p>
                <p className="text-[#159eec]">(237) 681-812-255</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#159eec]" />
              <div>
                <p>FUNCIONAMENTO</p>
                <p className="text-[#159eec]">09:00 - 20:00 Seg - Sab</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#159eec]" />
              <div>
                <p>LOCALIZAÇÃO</p>
                <p className="text-[#159eec]">0123 Algum Lugar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-4 ml-auto">
                <Link to="/cadastro-medico" className="hover:text-[#159eec]">Sou Médico</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu de Navegação Azul Escuro */}
      <nav className="bg-[#1f2b6c] text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-20">
          <ul className="flex gap-8 text-sm font-medium">
            {/* CORREÇÃO: Links apontando para as rotas corretas */}
            <li><Link to="/" className={isActive("/")}>Início</Link></li>
            <li><Link to="/sobre" className={isActive("/sobre")}>Sobre Nós</Link></li>
            <li><Link to="/servicos" className={isActive("/servicos")}>Serviços</Link></li>
            <li><Link to="/colaboradores" className={isActive("/colaboradores")}>Colaboradores</Link></li>
            <li><Link to="/contato" className={isActive("/contato")}>Contato</Link></li>
            {/* Lógica Condicional de Menu */}
            {user && user.tipo === 'MEDICO' ? (
               <li><Link to="/area-medico" className={isActive("/area-medico")}>Minha Agenda</Link></li>
            ) : (
               <li><Link to="/minhas-consultas" className={isActive("/minhas-consultas")}>Meus Agendamentos</Link></li>
            )}
          </ul>

          <div className="flex items-center gap-4">
            {/* Botão Condicional: Login ou Perfil */}
            {user ? (
                <Link to="/perfil" className="flex items-center gap-2 bg-[#159eec] px-4 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-[#1f2b6c] transition">
                    <User size={18} />
                    <span>{user.nome.split(' ')[0]}</span>
                </Link>
            ) : (
                <Link to="/login" className="flex items-center gap-2 border border-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-[#1f2b6c] transition">
                    <LogIn size={18} />
                    <span>Entrar</span>
                </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/agendamento">
              <button className="bg-[#bfdbfe] text-[#1f2b6c] px-6 py-2 rounded-full font-bold hover:bg-white transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Agendamento
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#1f2b6c] text-white pt-16 pb-8 mt-auto">
    <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-600 pb-10">
      <div>
        <h3 className="text-2xl font-bold mb-4">MED<span className="text-[#159eec]">BAY</span></h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          Referência de excelência na área médica, proporcionando cuidado humanizado e tecnologia de ponta para você e sua família.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold mb-4 text-lg">Importante</h4>
        {/* CORREÇÃO: Links do Footer apontando para as rotas */}
        <ul className="text-sm space-y-3 text-gray-300">
          <li><Link to="/agendamento" className="hover:text-[#159eec] transition-colors">Agendamento</Link></li>
          <li><Link to="/colaboradores" className="hover:text-[#159eec] transition-colors">Colaboradores</Link></li>
          <li><Link to="/servicos" className="hover:text-[#159eec] transition-colors">Serviços</Link></li>
          <li><Link to="/sobre" className="hover:text-[#159eec] transition-colors">Sobre Nós</Link></li>
          <li><Link to="/minhas-consultas" className="hover:text-[#159eec] transition-colors">Meus Agendamentos</Link></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-4 text-lg">Fale Conosco</h4>
        <ul className="text-sm space-y-3 text-gray-300">
          <li className="flex items-center gap-2"><Phone size={14} /> (xx) xxxxx-xxxx</li>
          <li className="flex items-center gap-2"><Send size={14} /> contato@medbay.com</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Rua das Flores, 123 - Brasil</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-4 text-lg">Newsletter</h4>
        <div className="flex bg-[#bfdbfe] rounded overflow-hidden border border-transparent focus-within:border-white transition-colors">
          <input 
            type="text" 
            placeholder="Entre com seu email" 
            className="bg-transparent px-4 py-2 text-[#1f2b6c] w-full outline-none placeholder-[#1f2b6c]/70 text-sm" 
          />
          <button className="bg-[#1f2b6c] text-white px-3 m-1 rounded hover:bg-[#159eec] transition">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-4 lg:px-20 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
      <p>© 2025 MedBay - Todos os direitos reservados.</p>
      <div className="flex gap-6">
        <Linkedin size={20} className="cursor-pointer hover:text-[#159eec] transition-colors" />
        <Facebook size={20} className="cursor-pointer hover:text-[#159eec] transition-colors" />
        <Instagram size={20} className="cursor-pointer hover:text-[#159eec] transition-colors" />
      </div>
    </div>
  </footer>
);

export default function Layout() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}