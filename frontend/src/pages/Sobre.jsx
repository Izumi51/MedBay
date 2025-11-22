import { Quote } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Superior */}
      <div className="bg-[#bfdbfe]/30 h-64 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Início / Sobre Nós</p>
          <h1 className="text-5xl font-bold text-[#1f2b6c] mt-2">Sobre Nós</h1>
        </div>
        <div className="absolute right-0 top-0 bg-[#bfdbfe]/50 w-96 h-96 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagem da Equipe */}
          <div className="relative">
             <img 
               src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
               alt="Equipe Médica" 
               className="rounded-lg shadow-xl w-full h-auto object-cover"
             />
             <div className="absolute -bottom-10 -right-10 bg-[#1f2b6c] text-white p-8 rounded-lg hidden lg:block">
                <p className="text-4xl font-bold mb-2">20+</p>
                <p className="text-sm">Anos de Experiência</p>
             </div>
          </div>

          {/* Conteúdo de Texto */}
          <div>
            <p className="text-[#159eec] font-bold tracking-widest mb-2">BEM VINDO À MEDBAY</p>
            <h2 className="text-4xl font-bold text-[#1f2b6c] mb-6">Melhor Cuidado com a Sua Saúde</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-[#1f2b6c] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#159eec] rounded-full"></span> Uma paixão por curar
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#159eec] rounded-full"></span> Cuidado 5 estrelas
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#159eec] rounded-full"></span> Melhores especialistas
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#159eec] rounded-full"></span> Acredite em nós
              </div>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
              Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque. 
              Convallis felis vitae tortor augue. Velit nascetur proin massa in.
            </p>
          </div>
        </div>
      </div>

      {/* Seção de Citação (Fundo Azul Escuro) */}
      <div className="bg-[url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop')] bg-cover bg-fixed relative py-24">
        <div className="absolute inset-0 bg-[#1f2b6c]/80"></div>
        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center text-white">
          <Quote size={48} className="mx-auto mb-6 text-[#bfdbfe]" />
          <p className="text-2xl lg:text-3xl font-serif italic max-w-4xl mx-auto mb-8 leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
            Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et."
          </p>
          <div className="w-20 h-1 bg-[#bfdbfe] mx-auto mb-4"></div>
          <p className="font-bold text-xl">Paulo Massilon</p>
          <p className="text-[#bfdbfe]">Diretor Clínico</p>
        </div>
      </div>
    </div>
  );
}