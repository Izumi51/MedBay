import { Phone, MapPin, Mail, Clock } from 'lucide-react';

export default function Contato() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#bfdbfe]/30 h-64 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Início / Contato</p>
          <h1 className="text-5xl font-bold text-[#1f2b6c] mt-2">Nossos Contatos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-16">
        <p className="text-[#159eec] font-bold tracking-widest mb-2">FALE CONOSCO</p>
        <h2 className="text-4xl font-bold text-[#1f2b6c] mb-12">Contato</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulário */}
          <form className="bg-[#1f2b6c] p-10 rounded-lg text-white">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Nome" className="bg-transparent border-b border-gray-500 p-3 outline-none focus:border-white placeholder-gray-400" />
              <input type="email" placeholder="Email" className="bg-transparent border-b border-gray-500 p-3 outline-none focus:border-white placeholder-gray-400" />
            </div>
            <input type="text" placeholder="Assunto" className="w-full bg-transparent border-b border-gray-500 p-3 mb-4 outline-none focus:border-white placeholder-gray-400" />
            <textarea placeholder="Escrever mensagem" rows="5" className="w-full bg-transparent border-b border-gray-500 p-3 mb-8 outline-none focus:border-white placeholder-gray-400"></textarea>
            
            <button className="w-full bg-[#bfdbfe] text-[#1f2b6c] font-bold py-3 rounded hover:bg-white transition">
              ENVIAR
            </button>
          </form>

          {/* Cards de Informação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#bfdbfe]/40 p-8 rounded-lg hover:bg-[#1f2b6c] hover:text-white transition group duration-300">
              <Phone size={32} className="text-[#1f2b6c] mb-4 group-hover:text-white" />
              <h4 className="font-bold mb-2">EMERGÊNCIA</h4>
              <p className="text-sm opacity-80">(237) 681-812-255</p>
              <p className="text-sm opacity-80">(237) 666-331-894</p>
            </div>
            <div className="bg-[#1f2b6c] text-white p-8 rounded-lg">
              <MapPin size={32} className="mb-4" />
              <h4 className="font-bold mb-2">LOCALIZAÇÃO</h4>
              <p className="text-sm opacity-80">0123 Algum Lugar</p>
              <p className="text-sm opacity-80">9876 Por ai</p>
            </div>
            <div className="bg-[#bfdbfe]/40 p-8 rounded-lg hover:bg-[#1f2b6c] hover:text-white transition group duration-300">
              <Mail size={32} className="text-[#1f2b6c] mb-4 group-hover:text-white" />
              <h4 className="font-bold mb-2">EMAIL</h4>
              <p className="text-sm opacity-80">empresa@gmail.com</p>
              <p className="text-sm opacity-80">contato@medbay.com</p>
            </div>
            <div className="bg-[#bfdbfe]/40 p-8 rounded-lg hover:bg-[#1f2b6c] hover:text-white transition group duration-300">
              <Clock size={32} className="text-[#1f2b6c] mb-4 group-hover:text-white" />
              <h4 className="font-bold mb-2">FUNCIONAMENTO</h4>
              <p className="text-sm opacity-80">Seg-Sáb 09:00-20:00</p>
              <p className="text-sm opacity-80">Dom Apenas emergências</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}