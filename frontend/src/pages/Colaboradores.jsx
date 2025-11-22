import { useState, useEffect } from 'react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import api from '../services/api';

export default function Colaboradores() {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    api.get('/medicos')
      .then(res => setMedicos(res.data))
      .catch(err => console.error("Erro:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#bfdbfe]/30 h-64 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Início / Colaboradores</p>
          <h1 className="text-5xl font-bold text-[#1f2b6c] mt-2">Nossos Colaboradores</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-16">
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicos.map((medico) => (
            <div key={medico.id} className="bg-[#bfdbfe]/20 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 group">
              {/* Área da Foto */}
              <div className="h-96 overflow-hidden relative bg-gray-300">
                <img 
                  src={medico.fotoUrl || "https://via.placeholder.com/400x500"} 
                  alt={medico.nome} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>
              
              {/* Informações */}
              <div className="text-center py-6 px-4 bg-[#bfdbfe]/40">
                <h3 className="text-[#1f2b6c] font-bold text-xl">{medico.nome}</h3>
                <p className="text-[#1f2b6c] font-bold uppercase text-sm tracking-widest mt-1 mb-4">{medico.especialidade}</p>
                
                {/* Redes Sociais */}
                <div className="flex justify-center gap-4 text-[#1f2b6c] mb-6">
                  <Linkedin size={20} className="cursor-pointer hover:text-[#159eec]" />
                  <Facebook size={20} className="cursor-pointer hover:text-[#159eec]" />
                  <Instagram size={20} className="cursor-pointer hover:text-[#159eec]" />
                </div>

                <button className="w-full bg-[#1f2b6c] text-white py-3 uppercase text-xs font-bold hover:bg-[#159eec] transition">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}