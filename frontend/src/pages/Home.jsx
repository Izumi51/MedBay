import { Link } from 'react-router';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-50 h-[600px] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="z-10">
            <p className="text-[#159eec] font-bold tracking-widest mb-2">CUIDANDO DA VIDA</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1f2b6c] leading-tight mb-6">
              Liderando o Caminho na Excelência Médica
            </h1>
            <Link to="/agendamento">
              <button className="bg-[#bfdbfe] text-[#1f2b6c] px-8 py-3 rounded-full font-bold hover:bg-[#1f2b6c] hover:text-white transition">
                Nossos Serviços
              </button>
            </Link>
          </div>
          {/* Imagem ilustrativa (placeholder colorido para simular a foto do médico) */}
          <div className="hidden md:block relative h-full">
             <div className="absolute right-0 top-[-50px] bg-[#159eec] w-96 h-96 rounded-full opacity-10"></div>
             {/* Aqui entraria a imagem do médico sorrindo */}
             <div className="bg-gray-300 w-80 h-96 ml-auto rounded-tl-[50px] rounded-br-[50px]"></div>
          </div>
        </div>
      </section>

      {/* Seção de Serviços Rápida */}
      <section className="py-16 container mx-auto px-4 lg:px-20 text-center">
        <p className="text-[#159eec] font-bold">BEM VINDO À MEDBAY</p>
        <h2 className="text-4xl font-bold text-[#1f2b6c] mb-12">Um ótimo lugar para receber cuidado</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
        </p>
        
        {/* Aqui carregaremos os serviços da API futuramente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {['Checkup', 'Cardiograma', 'Teste de DNA'].map((item) => (
             <div key={item} className="bg-[#1f2b6c] text-white p-8 rounded-lg hover:bg-[#159eec] transition cursor-pointer group">
               <h3 className="text-xl font-bold mb-4 group-hover:text-white">{item}</h3>
               <p className="text-white/70 mb-4">Ver mais detalhes</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}