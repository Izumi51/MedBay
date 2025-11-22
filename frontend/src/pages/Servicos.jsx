import { useState, useEffect } from 'react';
import { ArrowRight, Activity, HeartPulse, Dna, Stethoscope, UserPlus, ClipboardList } from 'lucide-react';
import api from '../services/api';

// Mapeamento de ícones (string da API -> Componente React)
const iconMap = {
  'activity': Activity,
  'heart-pulse': HeartPulse,
  'dna': Dna,
  'stethoscope': Stethoscope,
  'user-plus': UserPlus,
  'clipboard-list': ClipboardList
};

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    api.get('/servicos')
      .then(res => setServicos(res.data))
      .catch(err => console.error("Erro ao buscar serviços:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#bfdbfe]/30 h-64 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Início / Serviços</p>
          <h1 className="text-5xl font-bold text-[#1f2b6c] mt-2">Nossos Serviços</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico) => {
            // Seleciona ícone ou usa fallback
            const IconComponent = iconMap[servico.iconeUrl] || Activity; 

            return (
              <div key={servico.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                {/* Simulação da imagem do serviço (parte superior do card no Figma) */}
                <div className="h-48 bg-gray-200 relative flex items-center justify-center overflow-hidden">
                   {/* Imagem de fundo genérica para ilustrar */}
                   <img 
                     src={`https://source.unsplash.com/random/400x300/?medical,${servico.nome}`} 
                     alt={servico.nome} 
                     className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500" 
                     // Fallback visual se unsplash falhar
                     onError={(e) => e.target.style.display = 'none'}
                   />
                   {/* Ícone Flutuante */}
                   <div className="absolute right-4 bottom-4 bg-[#1f2b6c] text-white p-3 rounded-full z-10">
                      <IconComponent size={24} />
                   </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#1f2b6c] mb-4">{servico.nome}</h3>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                    {servico.descricao || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque."}
                  </p>
                  <a href="#" className="flex items-center text-[#159eec] font-medium hover:gap-2 transition-all">
                    Saiba mais <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}