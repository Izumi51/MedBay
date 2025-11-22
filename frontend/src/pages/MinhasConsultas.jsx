import { useState, useEffect, useContext } from 'react';
import { Calendar, Clock, MapPin, Video, FileText, DollarSign } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function MinhasConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    // Verificação de segurança: só busca se houver usuário logado
    if (user && user.id) {
      api.get(`/consultas/paciente/${user.id}`) // 4. Uso do ID dinâmico
        .then(response => {
          setConsultas(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erro ao buscar consultas:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMADA': return 'bg-green-100 text-green-700 border-green-200';
      case 'AGENDADA': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CANCELADA': return 'bg-red-100 text-red-700 border-red-200';
      case 'REALIZADA': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleCancelar = async (consultaId) => {
    const confirmacao = window.confirm("Tem certeza que deseja cancelar esta consulta?");
    
    if (!confirmacao) return;

    try {
      await api.patch(`/consultas/${consultaId}/cancelar`);
      
      // Feedback visual: Atualiza o estado local para refletir a mudança sem recarregar a página
      setConsultas(prevConsultas => 
        prevConsultas.map(consulta => 
          consulta.id === consultaId 
            ? { ...consulta, status: 'CANCELADA' } 
            : consulta
        )
      );
      
      alert('Consulta cancelada com sucesso!');
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      alert(error.response?.data || "Erro ao processar o cancelamento.");
    }
  };

  if (loading) return <div className="p-20 text-center text-[#1f2b6c]">Carregando seus agendamentos...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-[#bfdbfe]/30 h-48 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Área do Paciente</p>
          <h1 className="text-4xl font-bold text-[#1f2b6c] mt-2">Meus Agendamentos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-12">
        {consultas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Você ainda não possui consultas agendadas.</p>
            <a href="/agendamento" className="text-[#159eec] font-bold hover:underline mt-2 inline-block">
              Agendar agora
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {consultas.map((consulta) => {
              const data = new Date(consulta.dataHora);
              const dia = data.toLocaleDateString('pt-BR');
              const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={consulta.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                  
                  {/* Data (Calendário Visual) */}
                  <div className="bg-[#bfdbfe]/20 p-4 rounded-lg text-center min-w-[100px]">
                    <span className="block text-3xl font-bold text-[#1f2b6c]">{data.getDate()}</span>
                    <span className="block text-sm font-medium text-[#1f2b6c] uppercase">
                      {data.toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">{data.getFullYear()}</span>
                  </div>

                  {/* Detalhes Principais */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[#1f2b6c]">{consulta.medicoNome}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(consulta.status)} w-fit`}>
                        {consulta.status}
                      </span>
                    </div>
                    <p className="text-[#159eec] font-medium text-sm mb-4">{consulta.medicoEspecialidade}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-[#1f2b6c]" />
                        {hora}
                      </div>
                      <div className="flex items-center gap-1">
                        {consulta.tipo === 'TELEMEDICINA' ? (
                          <><Video size={16} className="text-[#1f2b6c]" /> Telemedicina</>
                        ) : (
                          <><MapPin size={16} className="text-[#1f2b6c]" /> Presencial</>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-[#1f2b6c]" />
                        R$ {consulta.valor.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 w-full md:w-auto">
                    {consulta.status === 'REALIZADA' && (
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-[#1f2b6c] text-[#1f2b6c] rounded-lg hover:bg-[#1f2b6c] hover:text-white transition text-sm font-medium">
                        <FileText size={16} /> Ver Receita
                      </button>
                    )}
                    {consulta.status === 'AGENDADA' && (
                      <button 
                        className="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition text-sm font-medium cursor-pointer"
                        onClick={() => handleCancelar(consulta.id)} // Chamada da nova função
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}